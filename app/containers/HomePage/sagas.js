/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_FEATURED_TESTS, LOAD_REPOS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError, featuredTestsLoaded } from 'containers/App/actions';

import request from 'utils/request';
import { selectUsername } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(selectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  // Call our request helper (see 'utils/request')
  const repos = yield call(request, requestURL);

  if (!repos.err) {
    yield put(reposLoaded(repos.data, username));
  } else {
    yield put(repoLoadingError(repos.err));
  }
}

const tbd = () => firebase.database().ref('/featured/').once('value').then((snapshot) => snapshot.val());

/**
 * Github repos request/response handler
 */
export function* getFeaturedTests() {
  const featuredTests = yield call(tbd);

  if (!featuredTests.err) {
    yield put(featuredTestsLoaded(featuredTests));
  } else {
    // yield put(repoLoadingError(repos.err));
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* getReposWatcher() {
  while (yield take(LOAD_REPOS)) {
    yield call(getRepos);
  }
}

export function* getFeaturedTestsWatcher() {
  while (yield take(LOAD_FEATURED_TESTS)) {
    yield call(getFeaturedTests);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* githubData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getReposWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* featuredTests() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getFeaturedTestsWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  // githubData,
  featuredTests,
];
