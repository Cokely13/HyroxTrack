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
    <div style={{padding : "20px"}}>
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
