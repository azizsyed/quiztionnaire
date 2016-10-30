import { createSelector } from 'reselect';

/**
 * Direct selector to the testGeneratorPage state domain
 */
const selectTestGeneratorPageDomain = () => (state) => state.get('testGeneratorPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TestGeneratorPage
 */

const selectTestGeneratorPage = () => createSelector(
  selectTestGeneratorPageDomain(),
  (substate) => substate.toJS()
);

export default selectTestGeneratorPage;
export {
  selectTestGeneratorPageDomain,
};
