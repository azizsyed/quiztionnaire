import React, { PropTypes } from 'react';
import styles from './styles.css';

function Icon(props) {
  const { icon, onClick = () => {} } = props;
  return (
    <span className="icon" onClick={onClick}><i className={`typcn typcn-${icon}`} /></span>
  );
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
