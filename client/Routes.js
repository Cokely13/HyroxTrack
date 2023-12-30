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
import MyResults from './components/MyResults';
import WeekView from './components/WeekView';
import UserPage from './components/UserPage';
import EditResult from './components/EditResult';
import EditProfile from './components/EditProfile';
import EventAverages from './components/EventAverages';
import TargetTimes from './components/TargetTimes';
import WorkoutDetail from './components/WorkoutDetail';
import Profile from './components/Profile';
import Workouts from './components/Workouts';
import PlanDetails from './components/PlanDetails';
import TimePrediction from './components/TimePrediction';
// import RowTimePrediction from './components/RowTImePrediction';
import Predictor from './components/Predictor'
import UserTarget from './components/UserTarget';
import Test from './components/Test'
import CreateChallenge from './components/CreateChallenge';
import MyChallenges from './components/MyChallenges';
import AddResult from './components/AddResult';
import ChallengeDetails from './components/ChallengeDetails';
import UpcomingChallenges from './components/UpcomingChallenges';
import Medals from './components/Medals';

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
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/grid" component={WeekView} />
            <Route exact path="/averages" component={EventAverages} />
            <Route exact path="/myresults" component={MyResults} />
            <Route exact path="/profile/edit" component={EditProfile} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/mychallenges" component={MyChallenges} />
            <Route exact path="/test" component={Test} />
            <Route exact path="/upcoming" component={UpcomingChallenges} />
            <Route exact path="/predictor" component={Predictor} />
            <Route exact path="/events/:eventId" component={EventDetail}/>
            <Route exact path="/plan/:planId" component={PlanDetails}/>
            <Route exact path="/challenges/:challengeId" component={ChallengeDetails}/>
            <Route exact path="/users" component={Users} />
            <Route exact path="/workouts" component={Workouts} />
            <Route exact path="/users/:userId" component={UserPage} />
            <Route exact path="/results" component={Results} />
            <Route exact path="/prediction" component={TimePrediction} />
            <Route exact path="/add" component={AddResult} />
            {/* <Route exact path="/row" component={RowTimePrediction} /> */}
            <Route exact path="/usertarget" component={TargetTimes} />
            <Route exact path="/target" component={UserTarget} />
            <Route exact path="/medals" component={Medals} />
            <Route exact path="/createchallenge" component={CreateChallenge} />
            <Route exact path="/workouts/:workoutId" component={WorkoutDetail} />
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
