import React, { useState } from 'react'
import { connect } from 'react-redux'

import Navbar from './components/Navbar'
import Routes from './Routes'
import BottomBar from './components/BottomBar'
import CurtainMenu from './components/CurtainMenu'

const App = ({ isLoggedIn }) => {
  const [isCurtainOpen, setIsCurtainOpen] = useState(false)

  const toggleCurtain = () => {
    setIsCurtainOpen(!isCurtainOpen)
  }

  return (
    <div>
      {isLoggedIn && <CurtainMenu isCurtainOpen={isCurtainOpen} toggleCurtain={toggleCurtain} />}
      <div className="main-content">
        <Routes />
      </div>
      {isLoggedIn && !isCurtainOpen && <BottomBar />}
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

export default connect(mapState)(App)


// import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import Navbar from './components/Navbar'
// import Routes from './Routes'
// import BottomBar from './components/BottomBar'
// import CurtainMenu from './components/CurtainMenu'


// const App = ({ isLoggedIn }) => {
//   const [isCurtainOpen, setIsCurtainOpen] = useState(false);
//   const [showBottomBar, setShowBottomBar] = useState(true);

//   const toggleCurtain = () => {
//     setIsCurtainOpen(!isCurtainOpen);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 600) { // Define your mobile width threshold here
//         setShowBottomBar(!isCurtainOpen);
//       } else {
//         setShowBottomBar(true);
//       }
//     };

//     // Call handler right away so state gets updated with initial window size
//     handleResize();

//     // Add event listener
//     window.addEventListener('resize', handleResize);

//     // Remove event listener on cleanup
//     return () => window.removeEventListener('resize', handleResize);
//   }, [isCurtainOpen]); // Only re-run the effect if isCurtainOpen changes

//   return (
//     <div>
//       {isLoggedIn && <CurtainMenu isCurtainOpen={isCurtainOpen} toggleCurtain={toggleCurtain} />}
//       <div className="main-content">
//         <Routes />
//       </div>
//       {isLoggedIn && showBottomBar && <BottomBar />}
//     </div>
//   );
// };

// const mapState = state => {
//   return {
//     isLoggedIn: !!state.auth.id
//   };
// };

// export default connect(mapState)(App);

