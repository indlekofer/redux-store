import assert from 'assert';
import combineReducers from '../src/utils/combineReducers';

const REDUCER_ONE = 'REDUCER_ONE';
const REDUCER_TWO = 'REDUCER_TWO';

//helper
const compare = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
}

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
  return undefined;
}

describe('combineReducers', () => {
  it('should combine', () => {
    const combined = (combineReducers({[REDUCER_ONE]: Reducer, [REDUCER_TWO]: Reducer2}))();
    assert.equal(compare(combined, { REDUCER_ONE: { message: 'default' }, REDUCER_TWO: { message: 'default' }}), true);
  });
  it('should not combine reducer with undefined next state', () => {
    const combined = (combineReducers({[REDUCER_ONE]: Reducer, [REDUCER_TWO]: Reducer3}))();
    assert.equal(compare(combined, { REDUCER_ONE: { message: 'default' }}), true);
  });
});

