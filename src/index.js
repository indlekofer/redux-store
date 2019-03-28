import { applyMiddleware, createStore, bindActionCreators } from 'redux';
import thunk from 'redux-thunk';

import modifiedCombineReducers from './utils/combineReducers';

const nullReducer = (state = null) => state;
const getInitialReducers = () => {
  return {___: nullReducer};
};

const store = createStore(modifiedCombineReducers(getInitialReducers()), {}, applyMiddleware(thunk));
var reducers = getInitialReducers();

store.inject = function (namespace, reducer, force = false) {
  if (force || typeof reducers[namespace] == "undefined") {
    reducers[namespace] = reducer;
    store.replaceReducer(modifiedCombineReducers(reducers));
  }
};
store.remove = function (namespace) {
  if (typeof namespace == "undefined") {
    reducers = getInitialReducers();
    store.replaceReducer(modifiedCombineReducers(getInitialReducers()));
  } else if (typeof reducers[namespace] != "undefined") {
    reducers[namespace] = undefined;
    store.replaceReducer(modifiedCombineReducers(reducers));
  }
};

export default store;
export {
  bindActionCreators
}
