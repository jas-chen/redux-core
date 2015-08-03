import { INCREMENT_COUNTER, DECREMENT_COUNTER, INCREMENT_DELAY, DUMMY_ACTION } from '../constants/IntentTypes';

const isBrowser = typeof window !== 'undefined';

function setQueryString(creatorId) {
  if(isBrowser) {
    const base = window.location.search.length ? window.location.search : '?action=';
    window.history.replaceState(null, null, base + creatorId);
  }
}

export function increment() {
  setQueryString(0);

  return {
    type: INCREMENT_COUNTER
  };
}

export function decrement() {
  setQueryString(1);

  return {
    type: DECREMENT_COUNTER
  };
}

export function incrementIfOdd() {
  setQueryString(2);

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
  setQueryString(3);

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
  setQueryString(4);

  function getRandomTime() { return Math.floor(Math.random()*10%5)*100+800; }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        type: INCREMENT_COUNTER
      });
    }, getRandomTime());
  });
}