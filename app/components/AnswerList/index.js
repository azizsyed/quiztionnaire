import React, { PropTypes } from 'react';
import Button from 'components/Button';

function AnswerList(props) {

  const { answers, onAnswer, className = '' } = props;
  const hasAnswerChoices = answers.length;

  if (!hasAnswerChoices){
    return null;
  }

  return (
    <div className={className}>
      <div>
        <div className="columns is-mobile is-gapless is-multiline">
          {answers.map((answerChoice) =>
            <div className="column">
              <Button classNames={['is-primary', 'is-outlined']} onClick={() => onAnswer(answerChoice)}>{answerChoice}</Button>
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
