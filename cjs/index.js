"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "bindActionCreators", {
  enumerable: true,
  get: function get() {
    return _redux.bindActionCreators;
  }
});
exports.default = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _combineReducers = _interopRequireDefault(require("./utils/combineReducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)((0, _combineReducers.default)(), {}, (0, _redux.applyMiddleware)(_reduxThunk.default));
var reducers = {};

store.inject = function (namespace, reducer) {
  var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (force || typeof reducers[namespace] == "undefined") {
    reducers[namespace] = reducer;
    store.replaceReducer((0, _combineReducers.default)(reducers));
  }
};

store.remove = function (namespace) {
  if (typeof namespace == "undefined") {
    reducers = {};
    store.replaceReducer((0, _combineReducers.default)());
  } else {
    reducers[namespace] = undefined;
    store.replaceReducer((0, _combineReducers.default)(reducers));
  }
};

var _default = store;
exports.default = _default;