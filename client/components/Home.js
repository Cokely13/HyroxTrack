import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = props => {
  const {userName} = props

  return (
    <div>
      <h3>Welcome, {userName}</h3>
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
