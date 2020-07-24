import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isWaiting } from 'redux-waiters'
import { dispatch as dispatchPromise } from '@adobe/redux-saga-promise'
import { loginActionCreator, loginAction } from './reducers/user'
import { incrCounterPromiseAction } from './reducers/counterWithPromise'
import logo from './logo.svg'
import './App.css'

const loginSelector = isWaiting(loginAction.id)
function App() {
  const dispatch = useDispatch()
  const waiter = useSelector(state => state.waiter)
  const isLogin = loginSelector(waiter)
  const handleLogin = () => {
    dispatch(loginActionCreator({ firstName: 'truong', lastName: 'luu' }))
  }

  const handleFetchRequest1 = () => {
    const response = dispatch({ type: 'FETCH_REQUESTED1' });
    console.log('response', response);
  }

  const handleIncrPromise = () => {
    dispatch(incrCounterPromiseAction({ value: 1 })).then(val => {
      console.log('val', val)
    }).catch((erro) => {
      console.log('error')
    })
  }

  const dispatchActionNeedSagaResolve = () => {
    debugger;
    const action = {
      type: 'NEED_SAGA_RESOLVE',
      meta: {
        promise: {
          resolve: (value) => {

            console.log('saga resolve with', value)
          },
          reject: (error) => {
            console.log('saga reject with', error)
          },
        },
      },
    }
    dispatch(action)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={handleLogin}>Login</button>
        <button onClick={() => dispatch({ type: 'FETCH_REQUESTED' })}>FETCH_REQUESTED saga</button>
        <button onClick={() => handleFetchRequest1()}>FETCH_REQUESTED1 saga</button>
        <button onClick={() => handleIncrPromise()}>incr counter promise</button>
        <button onClick={() => dispatchActionNeedSagaResolve()}>Dispatch action need saga resolve</button>
        {
          isLogin && <p>isLogin...</p>
        }
      </header>
    </div>
  );
}

export default App;
