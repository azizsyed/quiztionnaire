import React, { PropTypes } from 'react';
import Icon from 'components/Icon';
import ActualAnswer from './ActualAnswer';
import styles from './styles.css';

function TestResults(props) {
  const { questions } = props;

  // TODO: Wire up
  const results = {
    numCorrect: 3,
    numSkipped: 4,
  }

  const score = (results.numCorrect / questions.length*100);

  const getIcon = (isCorrect) => <Icon icon={`${isCorrect ? 'heart-full-outline ' + styles.correct : 'heart-full-outline ' + styles.incorrect}`} />

  console.log(questions[0]);

  return (
    <div>
      <h1>Overall score: {score}%</h1>

      <div className="columns is-tablet is-gapless">
        <div className="column is-1">
          Total Questions
        </div>
        <div className="column is-2">
          {questions.length}
        </div>
        <div className="column is-1">
          Number Skipped
        </div>
        <div className="column is-2">
          {results.numSkipped}
        </div>
        <div className="column is-1">
          Correct Answers
        </div>
        <div className="column is-2">
          {results.numCorrect}
        </div>
        <div className="column is-1">
          Number Attempted
        </div>
        <div className="column is-2">
          {results.numCorrect + results.numSkipped}
        </div>
      </div>

      <table className="table is-striped is-bordered">
        <thead>
          <tr>
            <th>Question</th>
            <th>Correct Answer</th>
            <th>Your Answer</th>
            <th>Result</th>
            <th>Time Spent</th>
            <th>Attempts</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Question</th>
            <th>Correct Answer</th>
            <th>Your Answer</th>
            <th>Result</th>
            <th>Time Spent</th>
            <th>Attempts</th>
          </tr>
        </tfoot>
        <tbody>
        {questions.map((question, index) => {
          return (
            <tr>
              <td>{question.parts.reduce((combined, part) => {
                let display = part.display;
                if (part.type === 'answer'){
                  display = `[${question.answer}]`
                }
                return combined + display
              }, '')}</td>
              <td>{question.answer}</td>
              <td><ActualAnswer answers={question.userAnswers} /></td>
              <td className="is-icon">
                {getIcon(question.answer == question.userAnswer)}
              </td>
              <td>tbd</td>
              <td>tbd</td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
}

TestResults.propTypes = {
};

export default TestResults;
