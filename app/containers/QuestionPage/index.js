/*
 *
 * QuestionPage
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import selectQuestionPage from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';
import Button from 'components/Button';
import Question from 'components/Question';
import TestOptions from 'components/TestOptions';

import { STATUS } from './reducer';

import { answerQuestion, loadQuestion, startTest, stopTest } from './actions';

export class QuestionPage extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }
  componentWillMount() {
    const { id } = this.props.params;
    this.setState({
      currentIndex: 0,
    });
    this.props.dispatchLoadQuestion(id);
  }

  render() {
    const { questions, dispatchAnswerQuestion, currentIndex, currentQuestion, status, dispatchStartTest, dispatchStopTest } = this.props;

    const handleStart = () => {
      dispatchStartTest();
    };

    const handleStop = () => {
      dispatchStopTest();
    };

    return (
      <div className={styles.question}>
        <FormattedMessage {...messages.header} />
        <h1>{status === STATUS.WAITING && 'WAITING'}</h1>
        <h1>{status === STATUS.FETCHING && 'FETCHING'}</h1>
        <h1>{status === STATUS.READY && 'READY'}</h1>
        <h1>{status === STATUS.ERROR && 'ERROR'}</h1>
        <h1>{status === STATUS.TEST_IN_PROGRESS && 'TEST_IN_PROGRESS'}</h1>
        <h1>{status === STATUS.TEST_COMPLETE && 'TEST_COMPLETE'}</h1>
        <h1>{status === STATUS.TEST_CANCELLED && 'TEST_CANCELLED'}</h1>

        {status === STATUS.TEST_CANCELLED &&
          <div>
            You have cancelled the test. Restart or return to main menu.
          </div>
        }

        {(status === STATUS.READY || status === STATUS.TEST_CANCELLED) && <TestOptions />}

        {(status === STATUS.TEST_CANCELLED || status === STATUS.TEST_COMPLETE) &&
          <div>
            {questions.map((question, index) => {
              return <p>{index}: {question.answer} -> {question.userAnswer}</p>
            })}
          </div>
        }

        {status === STATUS.TEST_IN_PROGRESS &&
          <div>
            <progress className="progress is-warning" value="75" max="100">75%</progress>
            <div>
              {currentQuestion && <Question {...currentQuestion} id={currentIndex} onAnswer={dispatchAnswerQuestion} />}
            </div>
          </div>
        }
        <Button onClick={handleStart}>Start Test</Button>
        <Button onClick={handleStop}>Stop Test</Button>
      </div>
    );
  }
}

QuestionPage.propTypes = {
  dispatchLoadQuestion: PropTypes.func.isRequired,
  dispatchAnswerQuestion: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
  questions: PropTypes.array,
  currentQuestion: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  status: PropTypes.symbol.isRequired,
  dispatchStartTest: PropTypes.func.isRequired,
  dispatchStopTest: PropTypes.func.isRequired,
};

const mapStateToProps = selectQuestionPage;

function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadQuestion: (id) => dispatch(loadQuestion(id)),
    dispatchAnswerQuestion: (id, answer) => dispatch(answerQuestion({ answer, id, })),
    dispatchStartTest: () => dispatch(startTest()),
    dispatchStopTest: () => dispatch(stopTest()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
