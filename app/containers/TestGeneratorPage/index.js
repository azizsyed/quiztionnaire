/*
 *
 * TestGeneratorPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Icon from 'components/Icon';
import selectTestGeneratorPage from './selectors';
import Button from 'components/Button';
import styles from './styles.css';
import { Equation, Expression, Fraction } from 'algebra.js';
import { findIndex, random } from 'lodash';

const MAX_NUMBER = 50;
const NUMBER_TYPE = {
  CONSTANT: 'CONSTANT',
  RANGE: 'RANGE',
}
const RANGE_BASIS = {
  ABSOLUTE: 'ABSOLUTE',
  RELATIVE: 'RELATIVE',
}

const Part = (props) => {
  const {
    part,
    index,
    onAnswerChange,
    onOperatorChange,
    onUpdate
  } = props;

  const showOperatorSection = part.isOperator === true;
  const showIsAnswerSection = !showOperatorSection;
  const showNumberTypeSection = part.isQuestionPart === true && !part.isAnswer;
  const showRangeBasisSection = showNumberTypeSection;
  const showRelativeBasisSection = showNumberTypeSection && part.rangeBasis==RANGE_BASIS.RELATIVE;
  const showUpperLowerBoundSection = showNumberTypeSection && part.numberType === NUMBER_TYPE.RANGE;
  const showConstantBoundSection = showNumberTypeSection && part.numberType === NUMBER_TYPE.CONSTANT;

  const handleIsAnswerChange = () => onAnswerChange(index);
  const handleOperatorChange = (event) => onOperatorChange(index, event.target.value);
  const handleOnUpdate = (property, event) => {
    onUpdate(index, property, event.target.value);
  };

  return (
    <div className={`column ${!showNumberTypeSection && 'is-2'}`}>
      <form>
      {part.display}

      {part.isOperator &&
        <p className="control">
          <span className="select is-expanded">
            <select onChange={handleOperatorChange} value={part.display}>
              <option>operator</option>
              <option value="=">=</option>
              <option value="+">+</option>
              <option value="-">-</option>
              <option value="×">×</option>
              <option value="÷">÷</option>
            </select>
          </span>
        </p>
      }

      { showIsAnswerSection && (
        <div>
          <p className="control">
            <label className="checkbox">
              <input type="radio" name="is-answer" checked={part.isAnswer} onChange={handleIsAnswerChange}/>
              Is Answer
            </label>
          </p>
        </div>
      )}

      { showNumberTypeSection && (
        <div>
          <label className="label">Number Type</label>
          <p className="control">
            <label className="radio">
              <input type="radio" name="numberType" checked={part.numberType === NUMBER_TYPE.CONSTANT} value={NUMBER_TYPE.CONSTANT} onChange={handleOnUpdate.bind(null, 'numberType')} />
              Constant
            </label>
            <label className="radio">
              <input type="radio" name="numberType" checked={part.numberType === NUMBER_TYPE.RANGE} value={NUMBER_TYPE.RANGE} onChange={handleOnUpdate.bind(null, 'numberType')} />
              Range
            </label>
          </p>
        </div>
      )}

      { showRangeBasisSection && (
        <div>
          <label className="label">Range Basis</label>
          <p className="control">
            <label className="radio">
              <input type="radio" name="rangeBasis" checked={part.rangeBasis==RANGE_BASIS.ABSOLUTE} value={RANGE_BASIS.ABSOLUTE} onChange={handleOnUpdate.bind(null, 'rangeBasis')} />
              Absolute
            </label>
            <label className="radio">
              <input type="radio" name="rangeBasis" disabled checked={showRelativeBasisSection} value={RANGE_BASIS.RELATIVE} onChange={handleOnUpdate.bind(null, 'rangeBasis')} />
              Relative
            </label>
          </p>
        </div>
      )}

      { showRelativeBasisSection && (
        <div>
          <label className="label">Relative Basis</label>
          <p className="control">
            <label className="label">Element</label>
            <span className="select">
              <select>
                <option>- element -</option>
                <option value="4">[9] (pos 4)</option>
              </select>
            </span>
          </p>
        </div>
      )}

      { showUpperLowerBoundSection && (
        <div>
          <label className="label">Upper Bound</label>
          <p className="control">
            <input type="range" min={part.lowerBound} max={MAX_NUMBER} value={part.upperBound} onChange={handleOnUpdate.bind(null, 'upperBound')} /> {part.upperBound}
          </p>

          <label className="label">Lower Bound</label>
          <p className="control">
            <input type="range" min="0" max={part.upperBound} value={part.lowerBound} onChange={handleOnUpdate.bind(null, 'lowerBound')} /> {part.lowerBound}
          </p>
        </div>
      )}

      { showConstantBoundSection && (
        <div>
          <label className="label">Constant Value</label>
          <p className="control">
            <input type="range" min="0" max={MAX_NUMBER} value={part.constantBound} onChange={handleOnUpdate.bind(null, 'constantBound')} /> {part.constantBound}
          </p>
        </div>
      )}
      </form>
    </div>
  );
};

export class TestGeneratorPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super();
    this.state = {
      numberOfGenerateQuestions: 10,
      parts: [
        {
          isQuestionPart: true,
          numberType: NUMBER_TYPE.RANGE,
          rangeBasis: RANGE_BASIS.ABSOLUTE,
          upperBound: 10,
          lowerBound: 1,
        },
        {
          display: '+',
          isOperator: true,
        },
        {
          display: '?',
          isQuestionPart: true,
          isAnswer: true,
        },
        {
          display: '=',
          isOperator: true,
        },
        {
          isQuestionPart: true,
          numberType: NUMBER_TYPE.CONSTANT,
          rangeBasis: RANGE_BASIS.ABSOLUTE,
          constantBound: 5
        },
      ],
      questions: [
        {
          // answers: ['1', '2', '3'],
          parts: [
            {
              display: '1',
              type: 'constant',
            },
            {
              display: '+',
              type: 'operator',
            },
            {
              display: null,
              type: 'answer',
            },
            {
              display: '=',
              type: 'operator',
            },
            {
              display: '3',
              type: 'constant',
            },
          ],
          answer: 2,
          hint: null,
          version: 'version',
          tags: [],
        }
      ]
    }
  }

  validateParts(parts) {
    const t = parts.filter(part => part.display === '=');
    const errors = [];
    if (t.length===0){
      errors.push('must include equality');
    }
    if (t.length>1){
      errors.push('only 1 equality may appear');
    }
    return errors;
  }

  render() {
    const { parts, questions, numberOfGenerateQuestions } = this.state;

    const handleClearAllQuestions = () => {
      this.setState({
        questions: []
      });
    }

    const handleOnAnswerChange = (index) => {
      const parts = [...this.state.parts];
      parts.forEach(part => {part.isAnswer = false;})
      parts[index].isAnswer = true;
      parts[index].display = '?';
      this.setState({ parts });
    };

    const handleOnOperatorChange = (index, operator) => {
      const parts = [...this.state.parts];
      parts[index].display = operator;
      this.setState({ parts });
    };

    const handleOnUpdate = (index, property, value) => {
      const parts = [...this.state.parts];
      parts[index][property] = value;
      this.setState({ parts });
    };

    const handleOnGenerateQuestions = () => {
      const { parts, numberOfGenerateQuestions } = this.state;
      const questions = [...this.state.questions];

      for (let x = 0; x<numberOfGenerateQuestions; x++){
        const question = {
          parts: parts.map(part => {
            let display = null;
            let type = '';

            if (part.isOperator){
              display = part.display;
              type = 'operator';
            }
            else if (part.isAnswer){
              display = null;
              type = 'answer';
            } else {
              if (part.numberType === NUMBER_TYPE.CONSTANT){
                display = part.constantBound;
              } else {
                display = random(part.lowerBound, part.upperBound);
              }
              type = 'constant';
            }

            return {
              display,
              type
            }
          }),
          answer: null,
          hint: null,
          version: null,
          tags: [],
        };

        const equalityIndex = findIndex(parts, part => (part.isOperator && part.display == '='));

        let exp1 = null;
        let exp2 = null;

        const getExpressionValue = (part) => {
          if (part.type === 'answer'){
            return 'x';
          }

          if (part.type === 'constant'){
            return parseInt(part.display, 10);
          }

          return null;
        }

        const getAction = (part) => {
          switch (part.display) {
            case '+':
              return 'add';
              break;
            case '-':
              return 'subtract';
              break;
            case '×':
              return 'multiply';
              break;
            case '÷':
              return 'divide';
              break;
            default:
              return null;
          }
        }

        question.parts.forEach((part, index, allParts) => {
          if (part.type === 'operator') {
            return;
          }
          const expressionValue = getExpressionValue(part);
          const nextAction = index === 0 ? null : getAction(allParts[index-1]);

          if (index < equalityIndex){
            if (!exp1){
              exp1 = new Expression(expressionValue);
              return;
            }

            exp1 = exp1[nextAction](expressionValue);
          }

          if (index > equalityIndex){
            if (!exp2){
              exp2 = new Expression(expressionValue);
              return;
            }

            exp2 = exp2[nextAction](expressionValue);
          }
        })

        console.log(exp1, exp2);

        const eqn = new Equation(exp1, exp2);

        question.answer = eqn.solveFor('x').toString();

        questions.push(question);
      }

      this.setState({ questions });
    };

    const handleDeleteQuestion = (index) => {
      const questions = [...this.state.questions];
      questions.splice(index, 1);
      this.setState({ questions });
    };

    const validations = this.validateParts(parts);
    const hasErrors = validations.length > 0;
    const hasQuestions = questions.length > 0;

    return (
      <div className={`columns ${styles.testGeneratorPage}`}>
        <div className="column">
          <h3>Parts</h3>

          <div className={`columns`}>
            {parts.map((part, index) => {
              return (
                <Part
                  key={index}
                  part={part}
                  index={index}
                  onAnswerChange={handleOnAnswerChange}
                  onOperatorChange={handleOnOperatorChange}
                  onUpdate={handleOnUpdate}
                />
              );
            })}
          </div>

          <div className={`columns is-mobile`}>
            <div className="column">
              <button className={`button ${hasErrors && 'is-danger is-disabled'} ${!hasErrors && 'is-info'}`} onClick={handleOnGenerateQuestions}>Generate Questions</button>
              <ul>
                {validations.map(validation => <li>{validation}</li>)}
              </ul>
            </div>
            <div className="column">
              <div>
                <p className="control">
                  <label className="label">Number of questions:</label>
                  <span className="select is-expanded">
                    <select value={numberOfGenerateQuestions}>
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </span>
                </p>
              </div>
            </div>
          </div>

        </div>
        <div className="column is-3-tablet is-2-desktop">
          <div className="columns is-mobile">
            <span className="column">
              <h3>Questions</h3>
            </span>
            <span className="column is-5">
              <Icon icon="trash" onClick={handleClearAllQuestions} /> <Icon icon="cloud-storage" onClick={handleClearAllQuestions} />
            </span>
          </div>
          <div>
            {hasQuestions && (
              <table className="table">
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Answers</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Question</th>
                    <th>Answers</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
                <tbody>
                  {questions.map((question, idx) => (
                    <tr key={idx}>
                      <td>{question.parts.map(part => part.display ? part.display : '?') } ({question.answer})</td>
                      <td>1,2,4,5</td>
                      <td><Icon icon="times" onClick={handleDeleteQuestion.bind(this, idx)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {!hasQuestions && (
              <span>Generate questions!</span>
            )}
          </div>
          <h3>Options</h3>
          <p>tbd...</p>
        </div>
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
