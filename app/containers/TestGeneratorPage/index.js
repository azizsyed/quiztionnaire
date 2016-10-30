/*
 *
 * TestGeneratorPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectTestGeneratorPage from './selectors';
import styles from './styles.css';

export class TestGeneratorPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.testGeneratorPage}>
      </div>
    );
  }
}

const mapStateToProps = selectTestGeneratorPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TestGeneratorPage);
