// http://www.factmonster.com/ipka/A0881931.html

function Exception(message) {
  this.message = message;
  this.name = 'Exception';
}

export class Question {
  constructor(question = {}) {
    const {
      id,
      answers,
    } = question;

    this.id = id;
    this.expectedAnswer = null;
    this.actualAnswer = null;
    this.answers = answers;
    this.duration = false;
    this.attemptCount = 0;
    this.attemptLimit = -1;
    this.isAnswered = false;
  }

  isCorrect() {
    throw new Exception('implement in extended export class');
  }

  getExpectedAnswer() {
    throw new Exception('not implemented');
  }

  getCurrentAnswer() {
    throw new Exception('not implemented');
  }

  setCurrentAnswer() {
    throw new Exception('not implemented');
  }

  confirm() {
    if (this.isCorrect()) {
      return this.handleCorrectResponse();
    }

    return this.handleIncorrectResponse();
  }

  handleIncorrectResponse() {
    throw new Exception('not implemented');
  }

  handleCorrectResponse() {
    throw new Exception('not implemented');
  }
}

export class AdditionQuestion extends Question {
  constructor(question) {
    super(question);
    this.augent = null;
    this.addend = null;
    this.sum = null;
  }

  isCorrect() {
    throw new Exception('not implemented');
  }
}

export class SubtractionQuestion extends Question {
  constructor(question) {
    super(question);
    this.minuend = null;
    this.subtrahend = null;
    this.difference = null;
  }

  isCorrect() {
    throw new Exception('not implemented');
  }
}

export class MultiplicationQuestion extends Question {
  constructor(question) {
    super(question);
    this.multiplicand = null;
    this.multiplier = null;
    this.product = null;
  }

  isCorrect() {
    throw new Exception('not implemented');
  }
}

export class DivisionQuestion extends Question {
  constructor(question) {
    super(question);
    this.dividend = null;
    this.divisor = null;
    this.quotient = null;
    this.remainder = null;
  }

  isCorrect() {
    throw new Exception('not implemented');
  }
}
