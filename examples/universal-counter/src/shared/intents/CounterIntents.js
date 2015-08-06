import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constants/IntentTypes';
import Rx from 'rx';

const isBrowser = typeof window !== 'undefined';

function appendIntentId(intentId) {
  if(isBrowser) {
    const base = window.location.search.length ? window.location.search : '?intentId=';
    window.history.replaceState(null, null, base + intentId);
  }
}

const incrementAction = { type: INCREMENT_COUNTER };

export function increment() {
  // index of this function in `CounterIntentList`
  appendIntentId(0);

  return incrementAction;
}

export function decrement() {
  appendIntentId(1);

  return {
    type: DECREMENT_COUNTER
  };
}

export function incrementIfOdd() {
  appendIntentId(2);

  return (getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return Rx.Observable.empty();
    }

    return incrementAction;
  };
}

export function incrementTimeout() {
  appendIntentId(3);

  return Rx.Observable.just(incrementAction).delay(1000);
}

export function incrementPromise() {
  appendIntentId(4);

  function getRandomTime() { return Math.floor(Math.random()*10%5)*100+800; }

  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(incrementAction);
    }, getRandomTime());
  });

  return Rx.Observable.fromPromise(promise);
}