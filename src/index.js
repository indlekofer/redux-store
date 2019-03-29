import { applyMiddleware, createStore, bindActionCreators } from 'redux';
import thunk from 'redux-thunk';

import modifiedCombineReducers from './utils/combineReducers';
const store = createStore(modifiedCombineReducers(), {}, applyMiddleware(thunk));
var reducers = {};

store.inject = function (namespace, reducer, force = false) {
  if (force || typeof reducers[namespace] == "undefined") {
    reducers[namespace] = reducer;
    store.replaceReducer(modifiedCombineReducers(reducers));
  }
};

store.remove = function (namespace) {
  if (typeof namespace == "undefined") {
    reducers = {};
    store.replaceReducer(modifiedCombineReducers());
  } else {
    reducers[namespace] = undefined;
    store.replaceReducer(modifiedCombineReducers(reducers));
  }
};

export default store;
export {
  bindActionCreators
}
