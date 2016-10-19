import React, { PropTypes } from 'react';
// import Button from 'components/Button';
import Part from 'components/Part';
import styles from './styles.css';

function Question(props) {
  const { answers, parts, answer, onAnswer } = props;

  return (
    <div className={styles.questionWrapper}>

      <h2>Question</h2>
      <div className="columns is-mobile">
        {parts.map((part) =>
          <div className="column"><Part {...part} /></div>
        )}
      </div>

      <h2>Answers</h2>
      <div className="columns is-mobile is-gapless">
        {answers.map((answerChoice) =>
          <div className="column"><a className="button is-primary is-outlined">{answerChoice}</a></div>
        )}
      </div>

      <h2>Answer Input</h2>
      <div className="columns">
        <div className="column">
          <p className="control has-icon has-icon-right">
            <input className="input is-success" type="text" placeholder="Text input" value={answer} />
            <i className="fa fa-check" />
            <span className="help is-success">This username is available</span>
          </p>
        </div>
      </div>

      <h2>Actions</h2>
      <div className="columns is-mobile">
        <div className="column">
          <a className="button is-danger">exit</a>
        </div>
        <div className="column">
          <a className="button is-warning">skip</a>
        </div>
        <div className="column">
          <button className="button is-primary" onClick={onAnswer}>answer</button>
        </div>
      </div>
    </div>
  );
}

Question.propTypes = {
  answers: PropTypes.array.isRequired,
  parts: PropTypes.array.isRequired,
  answer: PropTypes.object.isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default Question;
