import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../Styles/VideoDetails.css";

function VideoDetailsPage() {
  const [data, setData] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  const fetchDetails = async () => {
    try {
      const response = await fetch(`https://miniyt-backend.onrender.com/video/video/${id}`);
      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to fetch video details");
        return;
      }

      setData(result);
    } catch (e) {
      toast.error("Error fetching video details");
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await fetch("https://miniyt-backend.onrender.com/video/videos");
      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to fetch videos");
        setVideos([]);
        return;
      }

      if (!Array.isArray(result)) {
        toast.error("Unexpected response from server");
        console.log("Invalid data:", result);
        setVideos([]);
        return;
      }

      setVideos(result);
    } catch (e) {
      toast.error("Error fetching videos");
      setVideos([]);
    }
  };

  useEffect(() => {
    fetchDetails();
    fetchVideos();
  }, [id]);

  return (
    <div className="containerDetails">
      {data && (
        <div className="boxDetails1">
          <div id="inside1">
            <video src={`${data.filename}`} controls autoPlay />
          </div>
          <div id="inside2">
            <p>
              <strong>Title:</strong> {data.title}
            </p>
            <p>
              <strong>Description:</strong> {data.description}
            </p>
            <p>
              <strong>Hashtags:</strong> {data.hashtags}
            </p>
            <p>
              <span>
                <strong>Uploaded At:</strong>{" "}
                {new Date(data.uploadedAt).toLocaleString()}
              </span>
              <br />
              <span>
                <strong>Uploaded By:</strong>{" "}
                {data.uploadedBy?.name || "Unknown"}
              </span>
            </p>
          </div>
        </div>
      )}

      <div className="boxDetails2">
        {videos.map((item) => (
          <div className="boxVideo" key={item._id}>
            <Link to={`/video/${item._id}`}>
              <video src={`${item.filename}`} controls />
            </Link>
            <p>
              <strong>Title:</strong> {item.title}
            </p>
            <p>
              <strong>Hashtags:</strong> {item.hashtags}
            </p>
            <p>
              <strong>Uploaded By:</strong> {item.uploadedBy?.name || "Unknown"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoDetailsPage;
