import React, { Component, PropTypes } from 'react';
import AnswerList from 'components/AnswerList';
import Button from 'components/Button';
import Part from 'components/Part';
import styles from './styles.css';

class Question extends Component {

  constructor(props) {
    super(props);
    this.state = {
      elapsed: 0,
      answer: null,
      start: null,
    };
    this.timer = null;
  }

  componentDidMount() {
    this.tick();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.timer = setTimeout(() => {
      const { elapsed } = this.state;
      this.setState({
        elapsed: elapsed + 1,
      });
      this.tick();
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      clearInterval(this.timer);
      this.setState({
        elapsed: 0,
        answer: null,
        start: new Date(),
      });
      this.tick();
    }
  }

  selectAnswer(answer) {
    this.setState({
      answer
    });

    if (!this.props.isOnlySubmit){
      this.props.onAnswer(
        this.props.id,
        answer,
        new Date() - this.state.start
      );
    }
  }

  handleChange(event) {
    this.setState({answer: event.target.value});
  }

  render() {
    const { id, answers, parts, onAnswer, onSkip, onCancel, userAnswer, isOnlySubmit } = this.props;
    const { answer, elapsed } = this.state;

    const hasAnswerChoices = answers.length;

    const selectAnswer = this.selectAnswer.bind(this);

    const handleOnSubmit = () => {
      const { answer } = this.state;
      onAnswer(id, answer);
    };

    const handleOnSkip = () => {

      onSkip(id, new Date() - this.state.start);
    };

    const handleOnCancel = () => {
      const { answer } = this.state;
      onCancel(id);
    };

    return (
      <div className={styles.questionWrapper}>

        <div className="tile is-ancestor">
          <div className="tile is-vertical is-10">
            <div className="tile is-parent">
              <article className="tile is-child notification is-danger">
                <div className="columns">
                  <div className={`column`}>
                    <div className="columns is-mobile">
                      {parts.map((part) =>
                        <div className="column"><Part {...part} currentAnswer={answer} /></div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child notification is-info">
              <AnswerList show={hasAnswerChoices} answers={answers} className="column is-2" onAnswer={selectAnswer} />
            </article>
          </div>
        </div>

        <h2>Actions {elapsed}</h2>
        <div className="columns is-mobile">
          <div className="column">
            <Button classNames={['is-danger']} onClick={handleOnCancel}>exit</Button>
          </div>
          <div className="column">
            <Button classNames={['is-warning']} onClick={handleOnSkip}>skip</Button>
          </div>
          <div className="column">
            <Button classNames={['is-primary']} onClick={handleOnSubmit}>next</Button>
          </div>
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  answers: PropTypes.array.isRequired,
  parts: PropTypes.array.isRequired,
  answer: PropTypes.object.isRequired,
  onAnswer: PropTypes.func.isRequired,
  isOnlySubmit: PropTypes.bool.isRequired
};

export default Question;
