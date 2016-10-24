import React, { PropTypes } from 'react';
import Icon from 'components/Icon';
import styles from './styles.css';

function TestResults(props) {
  const { questions } = props;
  const success = <Icon icon="times-outline" />;
  const failure = <Icon icon="times" />;;
  return (
    <table className="table is-striped is-bordered">
      <thead>
        <tr>
          <th>Question</th>
          <th>Answer</th>
          <th>Result</th>
          <th>Time Spent</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Question</th>
          <th>Answer</th>
          <th>Result</th>
          <th>Time Spent</th>
        </tr>
      </tfoot>
      <tbody>
      {questions.map((question, index) =>
        <tr>
          <td>{question.parts.reduce((combined, part) => {
            let display = part.display;
            if (part.type === 'answer'){
              display = `[${question.answer}]`
            }
            return combined + display
          }, '')}</td>
          <td>{question.userAnswer || 'unanswered'}</td>
          <td className="is-icon">
            {question.answer}
            {question.userAnswer}
            {(question.answer == question.userAnswer) && success}
            {(question.answer != question.userAnswer) && failure}
          </td>
          <td>234343 s</td>
        </tr>
      )}
      </tbody>
    </table>
  );
}

TestResults.propTypes = {
};

export default TestResults;
