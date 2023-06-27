import React, { useState } from 'react';
import './styleComponents/AppNavbar.css';
import AppProfile from './AppProfile';

function AppNavbar() {
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Brian Trello</h1>
      <div className="profile-icon">
        <i className="fa fa-user-circle" onClick={toggleProfile}></i>
      </div>
      {showProfile && <AppProfile onClose={toggleProfile} />}
    </nav>
  );
}

export default AppNavbar;