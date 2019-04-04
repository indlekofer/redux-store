import { applyMiddleware, createStore, bindActionCreators, compose } from 'redux';
import thunk from 'redux-thunk';

import modifiedCombineReducers from './utils/combineReducers';
var __store;
var __reducers = {};
var __middlewares = {};

export const setup = () => {
  __store = createStore(modifiedCombineReducers(), {}, applyMiddleware(thunk, enhancer));
};

export const injectMiddleware = (middleware, namespace, force) => {
  if (typeof namespace == 'undefined') {
    __middlewares[Object.keys(__middlewares).length] = middleware;
  } else if (force || typeof __middlewares[namespace] == 'undefined') {
    __middlewares[namespace] = middleware;
  }
};
export const removeMiddleware = (namespace) => {
  __middlewares[namespace] = undefined;
};
export const resetMiddlewares = () => {
  __middlewares = {};
};

export const injectReducer = (reducer, namespace, force = false) => {
  if (force || typeof __reducers[namespace] == 'undefined') {
    __reducers[namespace] = reducer;
    __store.replaceReducer(modifiedCombineReducers(__reducers));
  }
};

export const removeReducer = (namespace) => {
  __reducers[namespace] = undefined;
  __store.replaceReducer(modifiedCombineReducers(__reducers));
};

export const resetReducers = () => {
  __reducers = {};
  __store.replaceReducer(modifiedCombineReducers());
};

const enhancer = (store) => (next) => (action) => {
  const chain = [];
  for (let i = 0, middlewaresKeys = Object.keys(__middlewares), c = middlewaresKeys.length; i < c; i++) {
    let middleware = __middlewares[middlewaresKeys[i]];
    if (typeof middleware !== 'undefined') {
      chain.push(middleware(store));
    }
  }
  return compose(...chain)(next)(action);
};

setup();

export default __store;
export {
  bindActionCreators
};
