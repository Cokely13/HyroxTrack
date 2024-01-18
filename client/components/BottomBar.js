import React from 'react';
import { Link } from 'react-router-dom';

const BottomBar = () => {
  return (
    <div className="bottom-bar">
      <Link to="/home" className="bottom">Home</Link>
      <Link to="/profile" className="bottom">Profile</Link>
      <Link to="/results" className="bottom">Results</Link>
      <Link  to="/mychallenges" className="bottom"><span className='fas fa-plus-square'>Challenges</span></Link>
      <Link to="/logout" className="bottom">Logout</Link>
    </div>
  );
};

export default BottomBar;
