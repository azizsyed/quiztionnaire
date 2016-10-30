import expect from 'expect';
import testGeneratorPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('testGeneratorPageReducer', () => {
  it('returns the initial state', () => {
    expect(testGeneratorPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
