import React, { PropTypes } from 'react';

function TestOptions() {
  return (
    <form>
      <p className="control">
        Time limit
      </p>
      <p className="control">
        Score limit
      </p>
      <p className="control">
        <label className="checkbox">
          <input type="checkbox" />
          Remember me
        </label>
      </p>
      <p className="control">
        <label className="radio">
          <input type="radio" name="question" />
          Yes
        </label>
        <label className="radio">
          <input type="radio" name="question" />
          No
        </label>
      </p>
      <p className="control">
        <button className="button is-primary">Submit</button>
        <button className="button is-link">Cancel</button>
      </p>
    </form>
  );
}

TestOptions.propTypes = {
};

export default TestOptions;
