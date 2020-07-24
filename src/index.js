import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { compose } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import waiter from 'redux-waiters'
import { promiseMiddleware } from '@adobe/redux-saga-promise'

import reducers from './reducers'
import { watchFetchData } from './sagas'

import App from './App';
import * as serviceWorker from './serviceWorker';

const sagaMiddleWare = createSagaMiddleware()

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const enhancer = composeEnhancers(
  applyMiddleware(promiseMiddleware, sagaMiddleWare)
  // other store enhancers if any
);
const store = createStore(reducers, enhancer);

sagaMiddleWare.run(watchFetchData)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
