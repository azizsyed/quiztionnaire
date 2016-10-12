import expect from 'expect';
import {
  answerQuestion,
  setQuestions,
  skipQuestion,
} from '../actions';
import {
  ANSWER_QUESTION,
  SET_QUESTIONS,
  SKIP_QUESTION,
} from '../constants';

describe('QuestionPage actions', () => {
  describe('Set Question', () => {
    it('has a type of SET_QUESTIONS', () => {
      // const question = {
      //   id: 'questionId',
      // };
      // const expected = {
      //   type: SET_QUESTIONS,
      //   payload: {
      //     question,
      //   },
      // };
      // expect(setQuestions(question)).toEqual(expected);
    });
  });

  describe('Answer Question', () => {
    it('has a type of ANSWER_QUESTION', () => {
      // const value = 999;
      // const id = 'questionId';
      // const timeSpan = 123456;
      // const expected = {
      //   type: ANSWER_QUESTION,
      //   payload: {
      //     id,
      //     timeSpan,
      //     value,
      //   },
      // };
      // expect(answerQuestion(id, value)).toEqual(expected);
    });
  });

  describe('Skip Question', () => {
    it('has a type of SKIP_QUESTION', () => {
      // const id = 'questionId';
      // const expected = {
      //   type: SKIP_QUESTION,
      //   payload: {
      //     id,
      //   },
      // };
      // expect(skipQuestion()).toEqual(expected);
    });
  });
});
