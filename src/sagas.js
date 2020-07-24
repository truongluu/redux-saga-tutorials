import { fork, take, takeEvery, call, cancel, cancelled } from 'redux-saga/effects';
import { resolvePromiseAction } from '@adobe/redux-saga-promise'
import { incrCounterPromiseAction } from './reducers/counterWithPromise'

export function* helloSaga() {
  yield takeEvery('HELLO', function* () {
    debugger;
    console.log('hello saga');
  })
}

function fetchData() {
  debugger;

  return 'data';
}

function fetchDataPromise() {
  debugger;
  return Promise.resolve(1);
}

function* handleMyAction(action) {
  debugger;
  const { value } = action.payload
  yield call(resolvePromiseAction, action, value)
}



export function* watchFetchData() {
  yield takeEvery(incrCounterPromiseAction, handleMyAction);
  yield takeEvery('FETCH_REQUESTED', fetchData)
  yield takeEveryNef('FETCH_REQUESTED1', fetchDataPromise)
}

const takeEveryNef = (pattern, saga, ...args) => fork(function* () {
  let currentTask
  while (true) {
    const action = yield take(pattern)
    if (currentTask) {
      yield cancel()
      yield cancelled()
    }
    currentTask = yield fork(saga, [...args.concat(action)])

  }
})