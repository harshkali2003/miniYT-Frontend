import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../Styles/Profile.css";

function Profile() {
  const [result, setResult] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  function handleEdit() {
    navigate(`/edit/${user?._id || user?.id}`);
  }

  function handleLog() {
    localStorage.clear();
    toast.done("logged out successfully");
    navigate("/");
  }

  async function handleRemove() {
    let data = await fetch(`https://miniyt-backend.onrender.com/user/delete/${user?._id}` , {
      method : "DELETE",
      headers : {"authorization" : `Bearer ${localStorage.getItem("token")}`}
    })
    data = await data.json()
    if(data.message === "success"){
      toast.success("account has been deleted")
      handleLog()
      navigate('/');
    }else{
      toast.error("something went wrong")
    }
  }

  useEffect(() => {
    const fetchVideos = async () => {
    let data = await fetch(`https://miniyt-backend.onrender.com/video/videos/user/${user._id}` , {
      headers : {'authorization' : `Bearer ${localStorage.getItem("token")}`}
    });
    data = await data.json();

    setResult(Array.isArray(data) ? data : []);
    if (!data) {
      toast.error("something went wrong");
    }
  };

  fetchVideos()
  }, [user._id]);
  return (
    <>
      <div className="containerProfile">
        <div className="boxProfile1">
          <div id="Profile1">
            <div>
              <img src={user?.picture || `https://miniyt-backend.onrender.com/${user?.filename}`} alt="User" />
            </div>

            <div>
              <p>{user?.name || "Guest"}</p>
            </div>
          </div>
          <div id="Profile2">
            <div id="profile5">
              <p>Email : {user?.email || "guest@gmail.com"}</p>
              <p>Phone : {user?.phone_no || "1234567890"}</p>
            </div>
            <div id="Profile4">
              <div>
                <button id="green" onClick={handleEdit}>
                  Edit
                </button>
              </div>
              <div>
                <button id="yellow" onClick={handleLog}>
                  Log Out
                </button>
              </div>
              <div>
                <button id="red" onClick={() => handleRemove(user?._id || user?.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="boxProfile2">
        
          {result.map((item) => (
            <div className="brand" key={item.id || item._id}>
              <video
                src={`${item.filename}`}
                controls
                muted
                loop
                playsInline
              ></video>
              <p>{item.title}</p>
              <p>{item.description}</p>
              <p>{item.user?.uploadedBy}</p>
              <p>{item.hashtags}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Profile;
