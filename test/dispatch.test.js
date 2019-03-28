import assert from 'assert';
import store from '../src/index';

const REDUCER_ONE = 'REDUCER_ONE';
const REDUCER_TWO = 'REDUCER_TWO';

const ACTION_ONE = 'ACTION_ONE';
const ACTION_TWO = 'ACTION_TWO';

//helper
const compare = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
}

//create a dummy reducer
var Reducer = (state = {message: "default"}, action) => {
  return (action.type == ACTION_ONE) ? {message: action.message} :  state;
}
//create a dummy reducer
var Reducer2 = (state = {message: "default"}, action) => {
  return (action.type == ACTION_TWO) ? {message: action.message} :  state;
}

//create dummy action
var addTestMessage = (message, type = ACTION_ONE) => {
  return {type, message};
}

//create dummy async thunk action
var addTestThunkMessage = (message, time = 50, type = ACTION_ONE) => (dispatch) => {
  setTimeout(() => { dispatch({type, message}) }, time);
}

describe('dispatch', () => {
  var unsubscribe;
  function handleChange(done, c, namespace = REDUCER_ONE) {
    assert.equal(c, store.getState()[namespace].message);
    done();
  }

  beforeEach(() => {
    store.remove();
    store.inject(REDUCER_ONE, Reducer);
    store.inject(REDUCER_TWO, Reducer2);
  });

  afterEach(() => {
    unsubscribe();
  });
  
  //the testing
  it('check dispatch', (done) => {
    var message = "test1";
    unsubscribe = store.subscribe(handleChange.bind(null, done, message, REDUCER_ONE));
    assert.equal(true, compare({type: ACTION_ONE, message}, store.dispatch(addTestMessage(message, ACTION_ONE))));
  });
  it('check dispatch ' + REDUCER_TWO, (done) => {
    var message = "test2";
    unsubscribe = store.subscribe(handleChange.bind(null, done, message, REDUCER_TWO));
    assert.equal(true, compare({type: ACTION_TWO, message}, store.dispatch(addTestMessage(message, ACTION_TWO))));
  });
  it('check dispatch fail', (done) => {
    var message = "test3";
    unsubscribe = store.subscribe(handleChange.bind(null, done, message, REDUCER_ONE));
    assert.equal(false, compare({type: ACTION_ONE, message}, store.dispatch(addTestMessage(message, ACTION_ONE))));
  });
  it('check dispatch fail ' + REDUCER_TWO, (done) => {
    var message = "test4";
    unsubscribe = store.subscribe(handleChange.bind(null, done, message, REDUCER_TWO));
    assert.equal(false, compare({type: ACTION_TWO, message}, store.dispatch(addTestMessage(message, ACTION_TWO))));
  });
  it('addTestThunkMessage 3', (done) => {
    var message = "test5";
    unsubscribe = store.subscribe(handleChange.bind(null, done, message, REDUCER_ONE));
    store.dispatch(addTestThunkMessage(message, 100, ACTION_ONE));
  });
  it('addTestThunkMessage 4', (done) => {
    var message = "test6";
    unsubscribe = store.subscribe(handleChange.bind(null, done, message, REDUCER_ONE));
    store.dispatch(addTestMessage(message, ACTION_ONE));
  });
  it('addTestThunkMessage 5', (done) => {
    var message = "test7";
    unsubscribe = store.subscribe(handleChange.bind(null, done, message, REDUCER_ONE));
    store.dispatch(addTestThunkMessage(message, ACTION_ONE));
  });
  it('addTestThunkMessage 3 ' + REDUCER_TWO, (done) => {
    var message = "test7";
    unsubscribe = store.subscribe(handleChange.bind(null, done, message, REDUCER_TWO));
    store.dispatch(addTestThunkMessage(message, 100, ACTION_TWO));
  });
  it('addTestThunkMessage 4 ' + REDUCER_TWO, (done) => {
    var message = "test8";
    unsubscribe = store.subscribe(handleChange.bind(null, done, message, REDUCER_TWO));
    store.dispatch(addTestMessage(message, ACTION_TWO));
  });
  it('addTestThunkMessage 5 ' + REDUCER_TWO, (done) => {
    var message = "test10";
    unsubscribe = store.subscribe(handleChange.bind(null, done, message, REDUCER_TWO));
    store.dispatch(addTestThunkMessage(message, 50, ACTION_TWO));
  });
});

