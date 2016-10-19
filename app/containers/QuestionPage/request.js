const mockQuestions = {
  id: 'blah',
  questions: [
    {
      answers: [1, 2, 3, 2, 3, 2, 3],
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
          type: '',
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
      partType: 'EQUATION',
      answer: 2,
      hint: null,
      version: 'version',
      tags: [],
    },
    {
      answers: [5, 6, 7],
      parts: [
        {
          display: '2',
          type: 'constant',
        },
        {
          display: '+',
          type: 'operator',
        },
        {
          display: '4',
          type: 'constant',
        },
        {
          display: '=',
          type: 'operator',
        },
        {
          display: null,
          type: 'answer',
        },
      ],
      partType: 'EQUATION',
      answer: 6,
      hint: null,
      version: 'version',
      tags: [],
    },
  ],
  version: 'version',
  tags: [],
  keywords: [],
  isFeatured: false,
};

export const request = (requestURL) =>
  new Promise((resolve, reject) => {
    const successTimer = setTimeout(() => {
      clearTimeout(failureTimer);
      resolve({
        data: mockQuestions,
        requestURL,
      });
    }, 1000);

    const failureTimer = setTimeout(() => {
      clearTimeout(successTimer);
      reject({
        err: 'Time out',
      });
    }, 2000);
  });

export default request;
