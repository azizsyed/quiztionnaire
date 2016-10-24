import React, { PropTypes } from 'react';
import Icon from 'components/Icon';
import styles from './styles.css';

import { SKIPPED } from '../../containers/QuestionPage/constants';

function ActualAnswer(props) {
  const { answer } = props;

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
