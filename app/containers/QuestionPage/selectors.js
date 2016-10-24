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

const selectCurrentIndex = createSelector(
  selectQuestionPageDomain(),
  (substate) => substate.get('currentIndex')
);

const selectCurrentQuestion = createSelector(
  selectCurrentIndex,
  selectQuestions,
  (currentIndex, questions) => {
    return (currentIndex === -1 ? null : questions[currentIndex])
  }
);

const selectIsOnlySubmit = createSelector(
  selectCurrentIndex,
  (selectCurrentIndex) => {
    // TODO: Replace with actual logic...below is mock/fake
    return selectCurrentIndex === 'null';
  }
);

/**
 * Default selector used by QuestionPage
 */

const selectQuestionPage = () => createSelector(
  selectCurrentQuestion,
  selectQuestions,
  selectStatus,
  selectCurrentIndex,
  selectIsOnlySubmit,
  (currentQuestion, questions, status, currentIndex, isOnlySubmit) => ({
    currentQuestion,
    currentIndex,
    questions,
    status,
    isOnlySubmit,
  })
);

export default selectQuestionPage;
