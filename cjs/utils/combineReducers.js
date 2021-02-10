"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/*
 * this is basicaly a clone of the original combineReducers function.
 * error handling and checking is completly removed.
 * @see https://github.com/reduxjs/redux/blob/master/src/combineReducers.js
 */
var _default = function _default(reducers) {
  var finalReducers = {};
  var finalReducerKeys;

  if (typeof reducers === 'undefined') {
    finalReducerKeys = [];
  } else {
    var reducerKeys = Object.keys(reducers);

    for (var i = 0, c = reducerKeys.length; i < c; i++) {
      var key = reducerKeys[i];

      if (typeof reducers[key] === 'function') {
        finalReducers[key] = reducers[key];
      }
    }

    finalReducerKeys = Object.keys(finalReducers);
  }

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;
    var nextState = {};

    for (var _i = 0, _c = finalReducerKeys.length; _i < _c; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey !== 'undefined') {
        nextState[_key] = nextStateForKey;
      }
    }

    return nextState;
  };
};

exports["default"] = _default;