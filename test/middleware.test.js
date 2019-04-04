import assert from 'assert';
import store, { injectReducer, resetReducers, resetMiddlewares, injectMiddleware, removeMiddleware } from '../src/index';

const REDUCER = 'REDUCER';
const ACTION = 'ACTION';

//create a dummy reducer
const Reducer = (state = {message: "default"}, action) => {
  return (action.type == ACTION) ? {message: action.message} :  state;
}
//create dummy middleware
const middleware = () => next => (action) => {
	//modify message
	action.message += '_add';
	return next(action);
}
const middleware2 = () => next => (action) => {
	//modify message
	action.message += '_add2';
	return next(action);
}

describe('middleware', () => {
  beforeEach(() => {
    resetReducers();
    injectReducer(Reducer, REDUCER);
    resetMiddlewares();
  });
  it('should dispatch', () => {
    store.dispatch({type: ACTION, message: 'something'});
    assert.equal('something', store.getState()[REDUCER].message);
  });
  it('should injectMiddleware without namespace', () => {
		injectMiddleware(middleware);
    store.dispatch({type: ACTION, message: 'something'});
    assert.equal('something_add', store.getState()[REDUCER].message);
  });
  it('should injectMiddleware with namespace', () => {
		injectMiddleware(middleware, 'add');
    store.dispatch({type: ACTION, message: 'something'});
    assert.equal('something_add', store.getState()[REDUCER].message);
  });
  it('should injectMiddleware multiple times', () => {
		injectMiddleware(middleware, 'add');
		injectMiddleware(middleware);
		injectMiddleware(middleware);
    store.dispatch({type: ACTION, message: 'something'});
    assert.equal('something_add_add_add', store.getState()[REDUCER].message);
  });
  it('should injectMiddleware multiple times remove one', () => {
		injectMiddleware(middleware, 'add');
		injectMiddleware(middleware);
		injectMiddleware(middleware);
		removeMiddleware('add');
    store.dispatch({type: ACTION, message: 'something'});
    assert.equal('something_add_add', store.getState()[REDUCER].message);
  });
  it('should injectMiddleware multiple times with force remove one', () => {
		injectMiddleware(middleware);
		removeMiddleware(0);
		injectMiddleware(middleware, 'add');
		injectMiddleware(middleware2, 'add', true);
    store.dispatch({type: ACTION, message: 'something'});
    assert.equal('something_add2', store.getState()[REDUCER].message);
  });
  it('should injectMiddleware one without force', () => {
		injectMiddleware(middleware, 'add');
		injectMiddleware(middleware2, 'add');
    store.dispatch({type: ACTION, message: 'something'});
    assert.equal('something_add', store.getState()[REDUCER].message);
  });
});

