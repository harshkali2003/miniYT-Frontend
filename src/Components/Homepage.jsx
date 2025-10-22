import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import { toast } from "react-toastify";
import "../Styles/Homepage.css";

function Homepage({ searchResults, isSearching , searchActive }) {
  const [result, setResult] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchVideos = async () => {
    try {
      let data = await fetch(`https://miniyt-backend.onrender.com/video/homepageVideos`);
      data = await data.json();
      setResult(data);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (!isSearching) {
      fetchVideos();
    }
  }, [isSearching]);

  const videosToShow = searchActive ? searchResults : result;

  return (
    <>
      <div className="containerHome">
        <div className="boxHome1">
          <div id="homeID1">
            <h2>Hi {user?.name || "Guest"}</h2>
          </div>
          <div id="homeID2">
            {videosToShow && videosToShow.length > 0 ? (
              videosToShow.map((item) => (
                <div className="brand" key={item._id}>
                <Link to={`/video/${item._id}`}>
                  <video
                    src={item.filename}
                    controls
                    muted
                    loop
                    playsInline
                  ></video>
                  <p>
                    <strong>{item.title}</strong>
                  </p>
                  <p>{item.description}</p>
                  <p>Uploaded by: {item.uploadedBy?.name || "Unknown"}</p>
                  <p>{item.hashtags?.join(" ")}</p>
                  </Link>
                </div>
              ))
            ) : (
              <p>No videos found.</p>
            )}
          </div>
        </div>
        <div className="boxHome2">it is for Ads</div>
      </div>
    </>
  );
}

export default Homepage;
