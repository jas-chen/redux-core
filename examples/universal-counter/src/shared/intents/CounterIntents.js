import { INCREMENT_COUNTER, DECREMENT_COUNTER, INCREMENT_DELAY, DUMMY_ACTION } from '../constants/IntentTypes';

const isBrowser = typeof window !== 'undefined';

function appendIntentId(intentId) {
  if(isBrowser) {
    const base = window.location.search.length ? window.location.search : '?intentId=';
    window.history.replaceState(null, null, base + intentId);
  }
}

export function increment() {
  // index of this function in `CounterIntentList`
  appendIntentId(0);

  return {
    type: INCREMENT_COUNTER
  };
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
      return {
        type: DUMMY_ACTION
      };
    }

    return {
      type: INCREMENT_COUNTER
    };
  };
}

export function incrementTimeout() {
  appendIntentId(3);

  return {
    type: INCREMENT_DELAY,
    payload: {
      action: {
        type: INCREMENT_COUNTER
      },
      time: 1000
    }
  };
}

export function incrementPromise() {
  appendIntentId(4);

  function getRandomTime() { return Math.floor(Math.random()*10%5)*100+800; }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        type: INCREMENT_COUNTER
      });
    }, getRandomTime());
  });
}