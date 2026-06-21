import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar({ activeTab, setActiveTab, searchQuery, setSearchQuery }) {
  const [scrolled, setScrolled] = useState(false);

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tabs = ["Home", "TV Shows", "Movies", "New & Popular", "My List"];

  return (
    <nav className={`navbar ${scrolled ? "navbar-black" : ""}`}>
      <div className="navbar-left">
        <h1 
          className="logo" 
          onClick={() => {
            setActiveTab("Home");
            setSearchQuery("");
          }}
        >
          NETFLIX
        </h1>
        <ul className="nav-links">
          {tabs.map((tab) => (
            <li key={tab}>
              <a
                href="#"
                className={activeTab === tab && !searchQuery ? "active-tab" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(tab);
                  setSearchQuery(""); // Clear search when switching tabs
                }}
              >
                {tab}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-right">
        <input
          type="text"
          className="search-box"
          placeholder="Search titles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="nav-icon" onClick={() => alert("No new notifications!")}>🔔</span>
        <div className="profile-icon" onClick={() => alert("Profile settings are not implemented yet.")}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Profile"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
