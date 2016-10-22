import React, { PropTypes } from 'react';

function AnswerList(props) {

  const { answers, onAnswer, className = '' } = props;
  const hasAnswerChoices = answers.length;

  if (!hasAnswerChoices){
    return null;
  }

  return (
    <div className={className}>
      <div>
        <h2>Answers</h2>
        <div className="columns is-mobile is-gapless is-multiline">
          {answers.map((answerChoice) =>
            <div className="column is-full-desktop is-full-tablet">
              <button className="button is-primary is-outlined" onClick={() => onAnswer(answerChoice)}>{answerChoice}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

AnswerList.propTypes = {
  // answers: PropTypes.array.isRequired,
  // parts: PropTypes.array.isRequired,
  // answer: PropTypes.object.isRequired,
  // onAnswer: PropTypes.func.isRequired,
};

export default AnswerList;
