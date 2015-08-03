import thunkMiddleware from './rx-middleware/thunkMiddleware';
import promiseMiddleware from './rx-middleware/promiseMiddleware';
import delayMiddleware from './rx-middleware/delayMiddleware';
import { DUMMY_ACTION } from './constants/IntentTypes';

import {combineReducers} from 'redux-core';
import * as reducers from './reducers';

const middleware = [thunkMiddleware, promiseMiddleware, delayMiddleware];

export function applyRxMiddleware(intent$, store) {
  const action$ = middleware.reduce((prev, cur) => {
    return prev.flatMap(cur(store.getState));
  }, intent$);

  return action$.filter(action => action.type !== DUMMY_ACTION);
}

export const reducer = combineReducers(reducers);