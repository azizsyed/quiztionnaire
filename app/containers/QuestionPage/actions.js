import { createAction } from 'redux-actions';

/*
 *
 * QuestionPage actions
 *
 */
import {
  ANSWER_QUESTION,
  SET_QUESTIONS,
  SKIP_QUESTION,
} from './constants';

export const answerQuestion = createAction(ANSWER_QUESTION);
export const setQuestions = createAction(SET_QUESTIONS);
export const skipQuestion = createAction(SKIP_QUESTION);
