import React, { Component, PropTypes } from 'react';
import AnswerList from 'components/AnswerList';
import Part from 'components/Part';
import styles from './styles.css';

class Question extends Component {

  constructor(props) {
    super(props);
    this.state = {
      elapsed: 0,
      answer: null,
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
      });
      this.tick();
    }
  }

  selectAnswer(answer) {
    this.setState({
      answer
    });
  }

  handleChange(event) {
    this.setState({answer: event.target.value});
  }

  render() {
    const { id, answers, parts, answer, onAnswer, userAnswer } = this.props;
    const { answer: currentAnswer } = this.state;

    const hasAnswerChoices = answers.length;

    const selectAnswer = this.selectAnswer.bind(this);

    const handleOnAnswer = () => {
      const { answer } = this.state;
      onAnswer(id, answer);
    };

    return (
      <div className={styles.questionWrapper}>
        {this.state.elapsed} / {currentAnswer}
        <div className="columns">
          <div className={`column is-${hasAnswerChoices ? '10' : 'full'}`}>
            <h2>Question [user answer: {userAnswer}]</h2>
            <div className="columns is-mobile">
              {parts.map((part) =>
                <div className="column"><Part {...part} /></div>
              )}
            </div>
          </div>
          <AnswerList show={hasAnswerChoices} answers={answers} className="column is-2" onAnswer={selectAnswer} />
        </div>

        {!hasAnswerChoices &&
          <div>
            <h2>Answer Input</h2>
            <div className="columns">
              <div className="column">
                <p className="control has-icon has-icon-right">
                  <input className="input is-success" type="text" placeholder="Text input" value={currentAnswer || ''} onChange={(e) => this.handleChange(e)}/>
                  <i className="fa fa-check" />
                  <span className="help is-success">This username is available</span>
                </p>
              </div>
            </div>
          </div>
        }

        <h2>Actions</h2>
        <div className="columns is-mobile">
          <div className="column">
            <a className="button is-danger">exit</a>
          </div>
          <div className="column">
            <a className="button is-warning">skip</a>
          </div>
          <div className="column">
            <button className="button is-primary" onClick={handleOnAnswer}>answer</button>
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
};

export default Question;
