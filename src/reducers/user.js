import { createReducer, createActionResources } from 'redux-waiters'
const delay = ms => new Promise(resolve => setTimeout(resolve, ms, ms))

const initialState = {
  currentUser: {}
}

export const loginAction = createActionResources('login user')

export default createReducer({
  [loginAction.success]: (state, payload) => ({
    ...state,
    currentUser: payload
  })
}, initialState)

export const loginActionCreator = (user) => loginAction.waiterAction(async (dispatch) => {
  dispatch(loginAction.start())
  await delay(2000)
  dispatch(loginAction.success(user))
})