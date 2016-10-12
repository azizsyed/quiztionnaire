import expect from 'expect';
import sinon, { spy, stub } from 'sinon';
import {
  Question
} from '../Question';

describe.only('Question', () => {
  describe('Question', () => {
    it('creates a Question', () => {
      const question = new Question();
      expect(question).toBeA(Question);
    });
    it('isCorrect');
    it('getAnswer');
    it('setAnswer sets the provided answer');
    it('confirm');
    it('handleIncorrectResponse');
    it('handleCorrectResponse');
  });
});