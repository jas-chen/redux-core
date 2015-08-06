import isBrowser from './isBrowser';

function appendIntentId(intentId) {
  if(isBrowser) {
    const base = window.location.search.length ? window.location.search : '?intentId=';
    window.history.replaceState(null, null, base + intentId);
  }
}

export default appendIntentId;