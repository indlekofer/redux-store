/*
 * this is basicaly a clone of the original combineReducers function.
 * error handling and checking is completly removed.
 * @see https://github.com/reduxjs/redux/blob/master/src/combineReducers.js
 */
export default (reducers) => {
  const finalReducers = {};
  var finalReducerKeys;
  if (typeof reducers === 'undefined') {
    finalReducerKeys = [];
  } else {
    const reducerKeys = Object.keys(reducers);
    for (let i = 0, c = reducerKeys.length; i < c; i++) {
      const key = reducerKeys[i];
      if (typeof reducers[key] === 'function') {
        finalReducers[key] = reducers[key];
      }
    }
    finalReducerKeys = Object.keys(finalReducers);
  }
  return (state = {}, action) => {
    const nextState = {};
    for (let i = 0, c = finalReducerKeys.length; i < c; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey !== 'undefined') {
        nextState[key] = nextStateForKey;
      }
    }
    return nextState;
  };
};
