// import React from 'react'

// import Navbar from './components/Navbar'
// import Routes from './Routes'
// import BottomBar from './components/BottomBar';
// import CurtainMenu from './components/CurtainMenu';

// const App = () => {
//   return (
//     <div>
//       {/* <Navbar /> */}
//       <CurtainMenu/>
//       <div className="main-content">
//       <Routes/>
//       </div>
//       <BottomBar/>
//     </div>
//   )
// }

// export default App

import React from 'react'
import { connect } from 'react-redux'

import Navbar from './components/Navbar'
import Routes from './Routes'
import BottomBar from './components/BottomBar';
import CurtainMenu from './components/CurtainMenu';

const App = ({ isLoggedIn }) => {
  return (
    <div>
      {/* <Navbar /> */}
      {isLoggedIn && <CurtainMenu/>}
      <div className="main-content">
        <Routes/>
      </div>
      {isLoggedIn && <BottomBar/>}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

export default connect(mapState)(App)
