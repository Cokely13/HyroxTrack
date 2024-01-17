import React from 'react';
import { Link } from 'react-router-dom';

const BottomBar = () => {
  return (
    <div className="bottom-bar">
      <Link to="/home" className="bottom">Home</Link>
      <Link to="/profile" className="bottom">Profile</Link>
      <Link to="/settings" className="bottom">Settings</Link>
      <Link to="/logout" className="bottom">Logout</Link>
    </div>
  );
};

export default BottomBar;
