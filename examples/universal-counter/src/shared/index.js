import commonMiddleware from './rx-middleware/commonMiddleware';
import {combineReducers} from 'redux-core';
import * as reducers from './reducers/counter';

const middleware = [commonMiddleware];

export function applyRxMiddleware(intent$, store) {
  return middleware.reduce((prev, cur) => {
    return prev.flatMap(cur(store.getState));
  }, intent$);
}

export const reducer = combineReducers(reducers);
