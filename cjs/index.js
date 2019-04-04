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
exports.default = exports.resetReducers = exports.removeReducer = exports.injectReducer = exports.resetMiddlewares = exports.removeMiddleware = exports.injectMiddleware = exports.setup = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _combineReducers = _interopRequireDefault(require("./utils/combineReducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __store;

var __reducers = {};
var __middlewares = {};

var setup = function setup() {
  __store = (0, _redux.createStore)((0, _combineReducers.default)(), {}, (0, _redux.applyMiddleware)(_reduxThunk.default, enhancer));
};

exports.setup = setup;

var injectMiddleware = function injectMiddleware(middleware, namespace, force) {
  if (typeof namespace == "undefined") {
    __middlewares[Object.keys(__middlewares).length] = middleware;
  } else if (force || typeof __middlewares[namespace] == "undefined") {
    __middlewares[namespace] = middleware;
  }
};

exports.injectMiddleware = injectMiddleware;

var removeMiddleware = function removeMiddleware(namespace) {
  __middlewares[namespace] = undefined;
};

exports.removeMiddleware = removeMiddleware;

var resetMiddlewares = function resetMiddlewares() {
  __middlewares = {};
};

exports.resetMiddlewares = resetMiddlewares;

var injectReducer = function injectReducer(reducer, namespace) {
  var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (force || typeof __reducers[namespace] == "undefined") {
    __reducers[namespace] = reducer;

    __store.replaceReducer((0, _combineReducers.default)(__reducers));
  }
};

exports.injectReducer = injectReducer;

var removeReducer = function removeReducer(namespace) {
  __reducers[namespace] = undefined;

  __store.replaceReducer((0, _combineReducers.default)(__reducers));
};

exports.removeReducer = removeReducer;

var resetReducers = function resetReducers() {
  __reducers = {};

  __store.replaceReducer((0, _combineReducers.default)());
};

exports.resetReducers = resetReducers;

var enhancer = function enhancer(store) {
  return function (next) {
    return function (action) {
      var chain = [];

      for (var i = 0, middlewaresKeys = Object.keys(__middlewares), c = middlewaresKeys.length; i < c; i++) {
        var middleware = __middlewares[middlewaresKeys[i]];

        if (typeof middleware !== 'undefined') {
          chain.push(middleware(store));
        }
      }

      return _redux.compose.apply(void 0, chain)(next)(action);
    };
  };
};

setup();
var _default = __store;
exports.default = _default;