import assert from 'assert';
import store from '../src/index';

const REDUCER_ONE = 'REDUCER_ONE';
const REDUCER_TWO = 'REDUCER_TWO';

//create a dummy reducer
var Reducer = (state = {message: "default"}, action) => {
  return state;
}
//create a dummy reducer
var Reducer2 = (state = {message: "default"}, action) => {
  return state;
}
//create a dummy reducer
var Reducer3 = (state = {message: "forced"}, action) => {
  return {message: "forced"};
}

describe('index', () => {
  beforeEach(() => {
    store.remove();
    store.inject(REDUCER_ONE, Reducer);
    store.inject(REDUCER_TWO, Reducer2);
  });
  it('should be empty', () => {
    store.remove(REDUCER_ONE);
    assert.equal(true, typeof store.getState()[REDUCER_ONE] === 'undefined');
    assert.equal(false, typeof store.getState()[REDUCER_TWO] === 'undefined');
    store.remove(REDUCER_TWO);
    assert.equal(true, typeof store.getState()[REDUCER_ONE] === 'undefined');
    assert.equal(true, typeof store.getState()[REDUCER_TWO] === 'undefined');
  });

  it('inject force', () => {
    store.inject(REDUCER_TWO, Reducer3, true);
    assert.equal('default', store.getState()[REDUCER_ONE].message);
    assert.equal('forced', store.getState()[REDUCER_TWO].message);
  });
  it('inject with out force', () => {
    store.inject(REDUCER_TWO, Reducer2);
    assert.equal('default', store.getState()[REDUCER_ONE].message);
    assert.equal('default', store.getState()[REDUCER_TWO].message);
  });
  it('nothing should change', () => {
    store.remove('notexists');
    assert.equal(false, typeof store.getState()[REDUCER_ONE] === 'undefined');
    assert.equal(false, typeof store.getState()[REDUCER_TWO] === 'undefined');
  });
  it('should clear all', () => {
    store.remove();
    assert.equal(true, typeof store.getState()[REDUCER_ONE] === 'undefined');
    assert.equal(true, typeof store.getState()[REDUCER_TWO] === 'undefined');
    store.inject(REDUCER_ONE, Reducer);
    store.inject(REDUCER_TWO, Reducer2);
    assert.equal(false, typeof store.getState()[REDUCER_ONE] === 'undefined');
    assert.equal(false, typeof store.getState()[REDUCER_TWO] === 'undefined');
    store.remove();
    assert.equal(true, typeof store.getState()[REDUCER_ONE] === 'undefined');
    assert.equal(true, typeof store.getState()[REDUCER_TWO] === 'undefined');
  });
  it('should clear specific and all', () => {
    store.remove();
    assert.equal(true, typeof store.getState()[REDUCER_ONE] === 'undefined');
    assert.equal(true, typeof store.getState()[REDUCER_TWO] === 'undefined');
    store.inject(REDUCER_ONE, Reducer);
    store.inject(REDUCER_TWO, Reducer2);
    assert.equal(false, typeof store.getState()[REDUCER_ONE] === 'undefined');
    assert.equal(false, typeof store.getState()[REDUCER_TWO] === 'undefined');
    store.remove(REDUCER_ONE);
    assert.equal(true, typeof store.getState()[REDUCER_ONE] === 'undefined');
    assert.equal(false, typeof store.getState()[REDUCER_TWO] === 'undefined');
    store.remove();
    assert.equal(true, typeof store.getState()[REDUCER_ONE] === 'undefined');
    assert.equal(true, typeof store.getState()[REDUCER_TWO] === 'undefined');
  });
});

