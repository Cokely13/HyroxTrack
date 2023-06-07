import React from 'react'
import {connect} from 'react-redux'
import TargetDate from './TargetDate'
import EventAverages from './EventAverages'

/**
 * COMPONENT
 */
export const Home = props => {
  const {userName} = props

  return (
    <div style={{padding : "50px"}}>
      <h3>Welcome, {userName}</h3>
      <TargetDate/>
      <div>
      <EventAverages />
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    userName: state.auth.userName
  }
}

export default connect(mapState)(Home)
