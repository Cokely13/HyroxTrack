import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import Events from './components/Events';
import {me} from './store'
import EventDetail from './components/EventDetail';
import Results from './components/Results';
import Users from './components/Users';
import Profile from './components/Profile';
import UserPage from './components/UserPage';
import EditResult from './components/EditResult';
import EditProfile from './components/EditProfile';
import EventAverages from './components/EventAverages';
import Date from './components/Date';
import TargetTimes from './components/TargetTimes';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/average" component={EventAverages} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile/edit" component={EditProfile} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/events/:eventId" component={EventDetail}/>
            <Route exact path="/users" component={Users} />
            <Route exact path="/users/:userId" component={UserPage} />
            <Route exact path="/results" component={Results} />
            <Route exact path="/date" component={Date} />
            <Route exact path="/target" component={TargetTimes} />
            <Route exact path="/results/edit/:resultId" component={EditResult} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
