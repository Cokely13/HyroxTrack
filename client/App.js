import React from 'react'

import Navbar from './components/Navbar'
import Routes from './Routes'
import BottomBar from './components/BottomBar';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <BottomBar />
    </div>
  )
}

export default App
