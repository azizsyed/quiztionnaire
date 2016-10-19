/**
 * Gets the repositories of the user from Github
 */
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import request from './request';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_QUESTION } from './constants';
import { questionsLoaded, questionsLoadingError } from './actions';

/**
 * Github repos request/response handler
 */
export function* getQuestions(questionId) {
  // TODO: Grab question id from state

  const requestURL = `http://some-domain.com/?questionId=${questionId}`;
  const questions = yield call(request, requestURL);

  if (!questions.err) {
    yield put(questionsLoaded(questions.data));
  } else {
    yield put(questionsLoadingError(questions.err));
  }
}

/**
 * Watches for LOAD_QUESTION action and calls handler
 */
export function* getQuestionsWatcher() {
  const { payload } = yield (take(LOAD_QUESTION));
  let action;

  do {
    yield call(getQuestions, payload);
    action = yield (take(LOAD_QUESTION));
  } while (action);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* questionData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getQuestionsWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  questionData,
];
