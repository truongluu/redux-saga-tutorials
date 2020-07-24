import { combineReducers } from 'redux'
import userReducer from './user'
import { waiterReducer } from 'redux-waiters'

export default combineReducers({
  user: userReducer,
  waiter: waiterReducer
})