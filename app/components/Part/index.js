import React, { PropTypes } from 'react';

function Part(props) {
  const { display, type } = props;

  return (
    <div className={{}}>
      {display} / {type}
    </div>
  );
}

Part.propTypes = {
  display: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Part;
