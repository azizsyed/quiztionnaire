import { createSelector } from 'reselect';

/**
 * Direct selector to the questionPage state domain
 */
const selectQuestionPageDomain = () => (state) => state.get('questionPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by QuestionPage
 */

const selectQuestionPage = () => createSelector(
  selectQuestionPageDomain(),
  (substate) => substate.toJS()
);

export default selectQuestionPage;
export {
  selectQuestionPageDomain,
};
