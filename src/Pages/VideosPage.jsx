import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../Styles/Video.css";

function VideosPage() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const fetchDetails = async () => {
    try {
      const response = await fetch("https://miniyt-backend.onrender.com/video/videos");
      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to fetch videos");
        setData([]); 
        return;
      }

      if (!Array.isArray(result)) {
        toast.error("Unexpected response from server");
        console.log("Invalid data:", result);
        setData([]);
        return;
      }

      setData(result);
    } catch (e) {
      toast.error("Error fetching videos");
      setData([]);
    }
  };

const handleSearch = async () => {
  if (!query.trim()) {
    toast.warning("Please enter something to search");
    return;
  }

  try {
    const response = await fetch(
      `https://miniyt-backend.onrender.com/video/videos/search?query=${encodeURIComponent(query)}`
    );

    const result = await response.json(); 

    if (!response.ok) {
      toast.warning(result.message || "No videos found");
      return;
    }

    setData(result);
  } catch (error) {
    console.error("Search error:", error);
    toast.error("Something went wrong while searching");
  }
};

  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <>
      <div className="searchBar">
        <input
          type="search"
          placeholder="search your favorite videos here"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>🔎</button>
      </div>

      <div className="containerVideo">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item) => (
            <div className="boxVideo" key={item._id}>
              <Link to={`/video/${item._id}`}>
                <video src={item.filename} controls />
              
              <p>
                <strong>Title:</strong> {item.title}
              </p>
              <p>
                <strong>Hashtags:</strong> {item.hashtags.join(" ")}
              </p>
              <p>
                <strong>Uploaded At:</strong>{" "}
                {new Date(item.uploadedAt).toLocaleString()}
              </p>
              </Link>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#666" }}>No videos found.</p>
        )}
      </div>
    </>
  );
}

export default VideosPage;
