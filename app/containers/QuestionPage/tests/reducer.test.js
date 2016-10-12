import expect from 'expect';
import questionPageReducer from '../reducer';
import {
  answerQuestion,
  setQuestions,
  // skipQuestion,
} from '../actions';
import { toJS, fromJS } from 'immutable';

describe('questionPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      questions: null,
      showError: false,
      showSummary: false,
    });
  });

  it('returns the initial state', () => {
    expect(questionPageReducer(undefined, {})).toEqual(fromJS(state));
  });

  it('sets questions', () => {
    const payload = 'questions';
    const expectedResult = state.set('questions', payload);

    expect(questionPageReducer(state, setQuestions(payload))).toEqual(expectedResult);
  });

  it('answers a question');

  it('handles incorrect responses');
});
