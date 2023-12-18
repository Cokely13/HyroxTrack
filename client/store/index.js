import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import singleEventReducer from './singleEventStore'
import eventsReducer from './allEventsStore'
import auth from './auth'
import usersReducer from './allUsersStore'
import singleUserReducer from './singleUserStore'
import singleResultReducer from './singleResultsStore'
import resultsReducer from './allResultsStore'
import workoutsReducer from './allWorkoutsStore'
import singleWorkoutReducer from './singleWorkoutStore'
import singleUserWorkoutReducer from './singleUserWorkoutStore'
import userworkoutsReducer from './allUserWorkoutsStore'
import programsReducer from './allProgramsStore'
import singleProgramReducer from './singleProgramStore'
import singleAverageReducer from './singleAverageStore'
import averagesReducer from './allAveragesStore'
import targetsReducer from './allTargetsStore'
import singleTargetReducer from './singleTargetStore'

const reducer = combineReducers({ auth,
  allEvents: eventsReducer,
  singleEvent: singleEventReducer,
  allUsers: usersReducer,
  singleUser: singleUserReducer,
  allResults: resultsReducer,
  singleResult: singleResultReducer,
  singleWorkout: singleWorkoutReducer,
  allWorkouts: workoutsReducer,
  allPrograms: programsReducer,
  allUserWorkouts: userworkoutsReducer,
  singleUserWorkout: singleUserWorkoutReducer,
  singleProgram: singleProgramReducer,
  singleAverage: singleAverageReducer,
  allAverages: averagesReducer,
  singleTarget: singleTargetReducer,
  allTargets: targetsReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
