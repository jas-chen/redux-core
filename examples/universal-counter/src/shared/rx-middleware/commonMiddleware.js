import Rx from 'rx';

export default function commonMiddleware(getState) {
  return intent => {
    let action = intent;

    if (typeof action === 'function') {
      action = action(getState);
    }

    if (action instanceof Rx.Observable) {
      return action;
    }

    return Rx.Observable.just(action);
  };
}
