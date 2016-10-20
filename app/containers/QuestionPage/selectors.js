import { createSelector } from 'reselect';

/**
 * Direct selector to the question state domain
 */
const selectQuestionPageDomain = () => (state) => state.get('question');

// const selectParamsDomain = () => (state) => state;

// const selectQuestionId = () => createSelector(
//   selectParamsDomain(),
//   (params) => {
//     return params;
//     // alert(params.toJS())
//     // return params.get('questionId')
//   }
// );

/**
 * Other specific selectors
 */
const selectQuestions = createSelector(
  selectQuestionPageDomain(),
  (substate) => substate.get('questions')
);

const selectStatus = createSelector(
  selectQuestionPageDomain(),
  (substate) => substate.get('status')
);

const selectCurrentQuestion = createSelector(
  selectQuestionPageDomain(),
  selectQuestions,
  (substate, questions) => {
    const currentIndex = substate.get('currentIndex');
    return currentIndex === -1 ? null : questions[currentIndex];
  }
);

/**
 * Default selector used by QuestionPage
 */

const selectQuestionPage = () => createSelector(
  selectCurrentQuestion,
  selectQuestions,
  selectStatus,
  (currentQuestion, questions, status) => ({
    currentQuestion,
    questions,
    status,
  })
);

export default selectQuestionPage;
export {
  // selectQuestionPageDomain,
  // selectQuestionId,
};
