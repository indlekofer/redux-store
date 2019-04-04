import assert from 'assert';
import store, { removeReducer, injectReducer, resetReducers } from '../src/index';

const REDUCER_ONE = 'REDUCER_ONE';
const REDUCER_TWO = 'REDUCER_TWO';

//create a dummy reducer
const Reducer = (state = {message: "default"}, action) => {
  return state;
}
//create a dummy reducer
const Reducer2 = (state = {message: "default"}, action) => {
  return state;
}
//create a dummy reducer
const Reducer3 = (state = {message: "forced"}, action) => {
  return {message: "forced"};
}

describe('reducer', () => {
  beforeEach(() => {
    resetReducers();
    injectReducer(Reducer, REDUCER_ONE);
    injectReducer(Reducer2, REDUCER_TWO);
  });
  it('should be empty', () => {
    removeReducer(REDUCER_ONE);
    assert.equal(true, typeof store.getState()[REDUCER_ONE] === 'undefined');
    assert.equal(false, typeof store.getState()[REDUCER_TWO] === 'undefined');
    removeReducer(REDUCER_TWO);
    assert.equal(true, typeof store.getState()[REDUCER_ONE] === 'undefined');
    assert.equal(true, typeof store.getState()[REDUCER_TWO] === 'undefined');
  });

  it('inject force', () => {
    injectReducer(Reducer3, REDUCER_TWO, true);
    assert.equal('default', store.getState()[REDUCER_ONE].message);
    assert.equal('forced', store.getState()[REDUCER_TWO].message);
  });
  it('inject with out force', () => {
    injectReducer(Reducer2, REDUCER_TWO);
    assert.equal('default', store.getState()[REDUCER_ONE].message);
    assert.equal('default', store.getState()[REDUCER_TWO].message);
  });
  it('nothing should change', () => {
    removeReducer('notexists');
    assert.equal(false, typeof store.getState()[REDUCER_ONE] === 'undefined');
    assert.equal(false, typeof store.getState()[REDUCER_TWO] === 'undefined');
  });
  it('should clear all', () => {
    resetReducers();
    assert.equal(true, typeof store.getState()[REDUCER_ONE] === 'undefined');
    assert.equal(true, typeof store.getState()[REDUCER_TWO] === 'undefined');
    injectReducer(Reducer, REDUCER_ONE);
    injectReducer(Reducer2, REDUCER_TWO);
    assert.equal(false, typeof store.getState()[REDUCER_ONE] === 'undefined');
    assert.equal(false, typeof store.getState()[REDUCER_TWO] === 'undefined');
    resetReducers();
    assert.equal(true, typeof store.getState()[REDUCER_ONE] === 'undefined');
    assert.equal(true, typeof store.getState()[REDUCER_TWO] === 'undefined');
  });
  it('should clear specific and all', () => {
    resetReducers();
    assert.equal(true, typeof store.getState()[REDUCER_ONE] === 'undefined');
    assert.equal(true, typeof store.getState()[REDUCER_TWO] === 'undefined');
    injectReducer(Reducer, REDUCER_ONE);
    injectReducer(Reducer2, REDUCER_TWO);
    assert.equal(false, typeof store.getState()[REDUCER_ONE] === 'undefined');
    assert.equal(false, typeof store.getState()[REDUCER_TWO] === 'undefined');
    removeReducer(REDUCER_ONE);
    assert.equal(true, typeof store.getState()[REDUCER_ONE] === 'undefined');
    assert.equal(false, typeof store.getState()[REDUCER_TWO] === 'undefined');
    resetReducers();
    assert.equal(true, typeof store.getState()[REDUCER_ONE] === 'undefined');
    assert.equal(true, typeof store.getState()[REDUCER_TWO] === 'undefined');
  });
});

