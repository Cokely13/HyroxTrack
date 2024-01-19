import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {logout} from '../store'

const BottomBar = ({ handleClick }) => {
  // const dispatch = useDispatch();
  return (
    <div className="bottom-bar">
      <Link to="/home" className="bottom"><span className='fas fa-home'></span>Home</Link>
      <Link to="/profile" className="bottom"><span className='	fas fa-user-alt'></span>Profile</Link>
      <Link to="/results" className="bottom"><span className='fas fa-bars'></span>Results</Link>
      <Link  to="/mychallenges" className="bottom"><span className='	far fa-handshake'></span>Challenges</Link>
      {/* <Link to="/login" className="bottom"><span className='	fas fa-door-open'></span>Logout</Link> */}
      <a href="#" onClick={handleClick} className="bottom"><span className='fas fa-door-open'></span>Logout</a>
    </div>
  );
};


const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(null, mapDispatch)(BottomBar);

