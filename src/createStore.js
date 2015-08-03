import isPlainObject from './utils/isPlainObject';

export default function createStore(reducer, initState) {
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  const initAction = {type: '@@redux-core/INIT_' + (new Date()).getTime()};
  let currentReducer = reducer;
  let state = currentReducer(initState, initAction);

  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Action must be a plain object.');
    }

    state = currentReducer(state, action);
    return state;
  }

  function replaceReducer(newReducer) {
    currentReducer = newReducer;
    dispatch(initAction);
  }

  return {
    getState: () => state,
    dispatch,
    getReducer: () => currentReducer,
    replaceReducer
  };
}
