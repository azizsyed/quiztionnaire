import { createAction } from 'redux-actions';

/*
 *
 * QuestionPage actions
 *
 */
import {
  ANSWER_QUESTION,
  LOAD_QUESTION,
  QUESTIONS_LOADED,
  QUESTIONS_LOADING_ERROR,
  SET_QUESTIONS,
  SKIP_QUESTION,
  START_TEST,
  STOP_TEST,
} from './constants';

export const answerQuestion = createAction(ANSWER_QUESTION);
export const setQuestions = createAction(SET_QUESTIONS);
export const skipQuestion = createAction(SKIP_QUESTION);

export const loadQuestion = createAction(LOAD_QUESTION, (id) => id);

export const questionsLoaded = createAction(QUESTIONS_LOADED);
export const questionsLoadingError = createAction(QUESTIONS_LOADING_ERROR);

export const startTest = createAction(START_TEST);
export const stopTest = createAction(STOP_TEST);
