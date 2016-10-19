import React, { PropTypes } from 'react';
import styles from './styles.css';

function Part(props) {
  const { display, type } = props;

  let output = null;

  if (type === 'constant') {
    output = display;
  }
  if (type === 'operator') {
    if (display === '-') {
      output = <span className="icon"><i className="typcn typcn-minus-outline" /></span>;
    }
    if (display === '+') {
      output = <span className="icon"><i className="typcn typcn-plus-outline" /></span>;
    }
    if (display === '*') {
      output = <span className="icon"><i className="typcn typcn-times-outline" /></span>;
    }
    if (display === '/') {
      output = <span className="icon"><i className="typcn typcn-divide-outline" /></span>;
    }
    if (display === '=') {
      output = <span className="icon"><i className="typcn typcn-equals-outline" /></span>;
    }
  }
  if (type === 'answer') {
    output = <span className="icon"><a className="button is-danger">?</a></span>;
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
