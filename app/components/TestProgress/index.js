import React, { PropTypes } from 'react';
import styles from './styles.css';

function TestProgress(props) {
  return (
    <progress className="progress is-warning" value={props.value} max={props.max} />
  );
}

TestProgress.propTypes = {
};

export default TestProgress;
