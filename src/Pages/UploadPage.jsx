import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../Styles/UploadPage.css";

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hashtagsInput, setHashtagsInput] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [uploadedAt, setUploadedAt] = useState("");
  const [file, setFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();
  const videoRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      toast.warning("Please log in first");
      navigate("/log");
    }
  }, [user, navigate]);

  useEffect(() => {
    const now = new Date();
    setUploadedAt(now.toISOString().slice(0, 16));
  }, []);

  useEffect(() => {
    return () => {
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [videoPreview]);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      toast.error("Please select a valid video file.");
      e.target.value = null;
      return;
    }
    setFile(file);
    const url = URL.createObjectURL(file);
    setVideoPreview(url);
  }

  function handleHashtagsKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      commitHashtags();
    }
  }

  function commitHashtags() {
    const items = hashtagsInput
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean)
      .map((h) => (h.startsWith("#") ? h : `#${h}`));
    const unique = Array.from(new Set([...hashtags, ...items]));
    setHashtags(unique.slice(0, 10));
    setHashtagsInput("");
  }

  function removeTag(tag) {
    setHashtags(hashtags.filter((t) => t !== tag));
  }

  function validateForm() {
    if (!title.trim()) return "Title is required.";
    if (!file) return "Please choose a video to upload.";
    if (!user?._id) return "You must be logged in.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    const formData = new FormData();
    formData.append("video", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("hashtags", hashtags.join(","));
    formData.append("uploadedBy", user._id);
    formData.append("uploadedAt", uploadedAt);

    try {
      setUploading(true);
      setProgress(0);

      const response = await fetch(
        `https://miniyt-backend.onrender.com/video/upload/${user._id}`,
        {
          method: "POST",
          body: formData,
          headers : {'authorization' : `Bearer ${localStorage.getItem("token")}`}
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Upload failed");

      toast.success("Video uploaded successfully!");

      setTitle("");
      setDescription("");
      setHashtags([]);
      setHashtagsInput("");
      setFile(null);
      setVideoPreview(null);
      setProgress(0);
      const now = new Date();
      setUploadedAt(now.toISOString().slice(0, 16));
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="upload-page">
      <form className="upload-card" onSubmit={handleSubmit}>
        <h2 className="title">Upload Video</h2>

        <label className="label">Title</label>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter video title"
        />

        <label className="label">Description</label>
        <textarea
          className="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description..."
        />

        <label className="label">Hashtags (comma-separated)</label>
        <input
          className="input"
          value={hashtagsInput}
          onChange={(e) => setHashtagsInput(e.target.value)}
          onKeyDown={handleHashtagsKeyDown}
          onBlur={commitHashtags}
          placeholder="e.g. travel, tutorial, vlogging"
        />
        <div className="tags-row">
          {hashtags.map((tag) => (
            <button
              key={tag}
              type="button"
              className="tag"
              onClick={() => removeTag(tag)}
              title="Click to remove"
            >
              {tag} ✕
            </button>
          ))}
        </div>

        <label className="label">Uploaded At</label>
        <input
          className="input"
          type="datetime-local"
          value={uploadedAt}
          onChange={(e) => setUploadedAt(e.target.value)}
        />

        <label className="label">Video File</label>
        <input
          className="input file-input"
          type="file"
          accept="video/*"
          onChange={handleFileChange}
        />

        {videoPreview && (
          <div className="preview">
            <video
              ref={videoRef}
              src={videoPreview}
              controls
              width="480"
              preload="metadata"
            />
          </div>
        )}

        <div className="actions">
          <button className="btn primary" type="submit" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
          <button
            className="btn ghost"
            type="button"
            onClick={() => {
              setTitle("");
              setDescription("");
              setHashtags([]);
              setHashtagsInput("");
              setFile(null);
              setVideoPreview(null);
              const now = new Date();
              setUploadedAt(now.toISOString().slice(0, 16));
            }}
          >
            Reset
          </button>
        </div>

        {uploading && (
          <div className="progress">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
        )}
      </form>

      <aside className="sidebar">
        <div className="meta">
          <h3>Preview metadata</h3>
          <p>
            <strong>Title:</strong> {title || "—"}
          </p>
          <p>
            <strong>By:</strong> {user?.name || "—"}
          </p>
          <p>
            <strong>Uploaded at:</strong>{" "}
            {uploadedAt ? new Date(uploadedAt).toString() : "—"}
          </p>
          <p>
            <strong>Hashtags:</strong>{" "}
            {hashtags.length ? hashtags.join(" ") : "—"}
          </p>
        </div>
      </aside>
    </div>
  );
}
