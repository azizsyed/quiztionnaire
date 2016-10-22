/*
 *
 * QuestionPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ANSWER_QUESTION,
  LOAD_QUESTION,
  QUESTIONS_LOADED,
  // QUESTIONS_LOADING_ERROR,
  SET_QUESTIONS,
  SKIP_QUESTION,
  START_TEST,
  STOP_TEST,
} from './constants';

const SKIPPED = Symbol('SKIPPED');

export const STATUS = {
  WAITING: Symbol('WAITING'),
  FETCHING: Symbol('FETCHING'),
  READY: Symbol('READY'),
  ERROR: Symbol('ERROR'),
  TEST_IN_PROGRESS: Symbol('TEST_IN_PROGRESS'),
  TEST_COMPLETE: Symbol('TEST_COMPLETE'),
  TEST_CANCELLED: Symbol('TEST_CANCELLED'),
};

const initialState = fromJS({
  questions: [],
  currentIndex: -1,
  showError: false,
  showSummary: false,
  status: STATUS.WAITING,
});

const setAnswer = (state, id, answer) => {
  const questions = state.get('questions');
  const question = questions[id];
  question.userAnswer = answer;

  return state.set('questions', questions);
}

const answerQuestion = (state, { answer, id }) => {
  return setAnswer(state, id, answer);
};

const skipQuestion = (state, { id }) => {
  return setAnswer(state, id, SKIPPED);
};

const nextQuestionIndex = (state) => {
  const nextIndex = state.get('currentIndex') + 1;
  const numQuestions = state.get('questions').length;
  const updatedstate = state.set('currentIndex', nextIndex);

  if (nextIndex === numQuestions) {
    return updatedstate
      .set('status', STATUS.TEST_COMPLETE);
  }

  return updatedstate;
}

function questionPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_QUESTION:
      return state
        .set('status', STATUS.FETCHING)
        .set('currentIndex', -1);
    case QUESTIONS_LOADED:
      return state
        .set('questions', action.payload.questions)
        .set('status', STATUS.READY);
    case ANSWER_QUESTION:
      return nextQuestionIndex(answerQuestion(state, action.payload));
    case SET_QUESTIONS:
      return state.set('questions', action.payload);
    case SKIP_QUESTION:
      return skipQuestion(state, action.payload)
        .set('currentIndex', state.get('currentIndex') + 1);
    case START_TEST:
      return state
        .set('currentIndex', 0)
        .set('status', STATUS.TEST_IN_PROGRESS);
    case STOP_TEST:
      return state.set('status', STATUS.TEST_CANCELLED);
    default:
      return state;
  }
}

export default questionPageReducer;
