/*
 *
 * QuestionPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ANSWER_QUESTION,
  SET_QUESTIONS,
  SKIP_QUESTION,
} from './constants';

const initialState = fromJS({
  questions: null,
  showError: false,
  showSummary: false,
});

function questionPageReducer(state = initialState, action) {
  switch (action.type) {
    case ANSWER_QUESTION:
      break;
    case SET_QUESTIONS:
      return state.set('questions', action.payload);
    case SKIP_QUESTION:
      break;
    default:
      return state;
  }

  return state;
}

export default questionPageReducer;
