// import React, { useEffect, useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import "../Styles/Navbar.css";

// function NavBar({ setSearchResults, setIsSearching }) {
//   const [query, setQuery] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
//   const location = useLocation();

//   useEffect(() => {
//     setIsLoggedIn(!!localStorage.getItem("user"));
//   }, [location]);

//   const handleSearch = async () => {
//     if (!query.trim()) {
//       toast.info("Enter a search term");
//       return;
//     }

//     try {
//       setIsSearching(true);
//       const res = await fetch(
//         `http://localhost:5000/video/videos/search?query=${encodeURIComponent(query)}`
//       );
//       const data = await res.json();
//       setSearchResults(Array.isArray(data) ? data : []);
//     } catch (err) {
//       toast.error("Failed to fetch search results");
//     }
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
      
//         <input
//           type="search"
//           placeholder="Search here"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//         />
//         <button onClick={handleSearch}>🔎</button>
//       </div>

//       <div className="navbar-center">
//         <h2>miniYT</h2>
//       </div>

//       <div className="navbar-right">
//         <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
//           ☰
//         </div>

//         <div className={`nav-links ${isOpen ? "open" : ""}`}>
//           {isLoggedIn ? (
//             <>
//               <NavLink
//                 to="/"
//                 className={({ isActive }) => (isActive ? "active" : "")}
//               >
//                 Home
//               </NavLink>
//               <NavLink
//                 to="/videos"
//                 className={({ isActive }) => (isActive ? "active" : "")}
//               >
//                 Video
//               </NavLink>
//               <NavLink
//                 to="/upload"
//                 className={({ isActive }) => (isActive ? "active" : "")}
//               >
//                 Upload
//               </NavLink>
//               <NavLink
//                 to="/profile"
//                 className={({ isActive }) => (isActive ? "active" : "")}
//               >
//                 Profile
//               </NavLink>
//             </>
//           ) : (
//             <>
//               <NavLink
//                 to="/"
//                 className={({ isActive }) => (isActive ? "active" : "")}
//               >
//                 Home
//               </NavLink>
//               <NavLink
//                 to="/videos"
//                 className={({ isActive }) => (isActive ? "active" : "")}
//               >
//                 Video
//               </NavLink>
//               <NavLink
//                 to="/upload"
//                 className={({ isActive }) => (isActive ? "active" : "")}
//               >
//                 Upload
//               </NavLink>
//               <NavLink
//                 to="/log"
//                 className={({ isActive }) => (isActive ? "active" : "")}
//               >
//                 Log in
//               </NavLink>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default NavBar;

import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "../Styles/Navbar.css";

function NavBar({ setSearchResults, setIsSearching , setSearchActive }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("user"));
  }, [location]);

const handleSearch = async () => {
  if (!query.trim()) {
    toast.info("Enter a search term");
    return;
  }

  try {
    setIsSearching(true);
    setSearchActive(true); // Mark that search mode is ON
    const res = await fetch(
      `https://miniyt-backend.onrender.com/video/videos/search?query=${encodeURIComponent(query)}`
    );
    const data = await res.json();

    if (!res.ok) {
      toast.warning(data.message || "No videos found");
      setSearchResults([]);
      setSearchActive(false);
      return;
    }

    setSearchResults(data);
  } catch (err) {
    toast.error("Search failed");
  } finally {
    setIsSearching(false);
  }
};


  return (
    <nav className="navbar">
      <div className="navbar-left">
        <input
          type="search"
          placeholder="Search here"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>🔎</button>
      </div>

      <div className="navbar-center">
        <h2>miniYT</h2>
      </div>

      <div className="navbar-right">
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          {isLoggedIn ? (
            <>
              <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
              <NavLink to="/videos" className={({ isActive }) => (isActive ? "active" : "")}>Video</NavLink>
              <NavLink to="/upload" className={({ isActive }) => (isActive ? "active" : "")}>Upload</NavLink>
              <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>Profile</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
              <NavLink to="/videos" className={({ isActive }) => (isActive ? "active" : "")}>Video</NavLink>
              <NavLink to="/upload" className={({ isActive }) => (isActive ? "active" : "")}>Upload</NavLink>
              <NavLink to="/log" className={({ isActive }) => (isActive ? "active" : "")}>Log in</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

