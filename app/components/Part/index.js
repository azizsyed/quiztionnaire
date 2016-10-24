import React, { PropTypes } from 'react';
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
    output = <span className="icon"><a className="button is-danger">{currentAnswer || '?'}</a></span>;
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
