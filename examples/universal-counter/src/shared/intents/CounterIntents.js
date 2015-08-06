import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constants/IntentTypes';
import list from './CounterIntentList.js';
import appendIntentId from '../utils/appendIntentId';
import Rx from 'rx';

const incrementAction = { type: INCREMENT_COUNTER };

export function increment() {
  appendIntentId(list.indexOf(increment));

  return incrementAction;
}

export function decrement() {
  appendIntentId(list.indexOf(decrement));

  return {
    type: DECREMENT_COUNTER
  };
}

export function incrementIfOdd() {
  appendIntentId(list.indexOf(incrementIfOdd));

  return (getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return Rx.Observable.empty();
    }

    return incrementAction;
  };
}

export function incrementTimeout() {
  appendIntentId(list.indexOf(incrementTimeout));

  return Rx.Observable.just(incrementAction).delay(1000);
}

export function incrementPromise() {
  appendIntentId(list.indexOf(incrementPromise));

  function getRandomTime() { return Math.floor(Math.random()*10%5)*100+800; }

  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(incrementAction);
    }, getRandomTime());
  });

  return Rx.Observable.fromPromise(promise);
}