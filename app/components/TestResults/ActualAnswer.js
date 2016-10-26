import React, { PropTypes } from 'react';
import Icon from 'components/Icon';
import styles from './styles.css';

import { SKIPPED } from '../../containers/QuestionPage/constants';

function ActualAnswer(props) {
  const { answers } = props;

  console.log(answers);

  debugger;

  const answer = (answers && answers.length) ? answers[answers.length - 1] : null;

  let display = answer || 'unanswered';

  if (answer === SKIPPED){
    display = 'skipped';
  }

  return (
    <span>{display}</span>
  );
}

ActualAnswer.propTypes = {
};

export default ActualAnswer;
