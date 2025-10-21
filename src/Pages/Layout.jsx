import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import Homepage from "../Components/Homepage";

function Layout() {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  return (
    <div>
      <NavBar
        setSearchResults={setSearchResults}
        setIsSearching={setIsSearching}
        setSearchActive={setSearchActive}
      />
      <Homepage
        searchResults={searchResults}
        isSearching={isSearching}
        searchActive={searchActive}
      />
    </div>
  );
}

export default Layout;
