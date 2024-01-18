import React from 'react'

import Navbar from './components/Navbar'
import Routes from './Routes'
import BottomBar from './components/BottomBar';
import CurtainMenu from './components/CurtainMenu';

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <CurtainMenu/>
      <div className="main-content">
      <Routes/>
      </div>
      <BottomBar/>
    </div>
  )
}

export default App
