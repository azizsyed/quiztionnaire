import React, { PropTypes } from 'react';
import Button from 'components/Button';
import Icon from 'components/Icon';
import styles from './styles.css';

function Part(props) {
  const { display, type, currentAnswer } = props;

  let output = null;

  if (type === 'constant') {
    output = display;
  }
  if (type === 'operator') {
    if (display === '-') {
      output = <Icon icon="minus-outline" />;
    }
    if (display === '+') {
      output = <Icon icon="plus-outline" />;
    }
    if (display === '*') {
      output = <Icon icon="times-outline" />;
    }
    if (display === '/') {
      output = <Icon icon="divide-outline" />;
    }
    if (display === '=') {
      output = <Icon icon="equals-outline" />;
    }
  }
  if (type === 'answer') {
    output = <span className={`${styles.answerPart}`}>{currentAnswer || '?'}</span>;
  }

  return (
    <div className={styles.partWrapper}>
      {output}
    </div>
  );
}

Part.propTypes = {
  display: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Part;
