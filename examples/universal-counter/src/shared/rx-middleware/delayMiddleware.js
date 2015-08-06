import { DELAY } from '../constants/IntentTypes';
import Rx from 'rx';

export default function thunkMiddleware(getState) {
  return action => {
    if(action.type === DELAY) {
      return Rx.Observable.just(action.payload.action).delay(action.payload.time);
    }

    return Rx.Observable.just(action);
  };
}
