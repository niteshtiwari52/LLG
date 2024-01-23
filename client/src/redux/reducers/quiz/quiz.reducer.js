import {
  QUIZ_CREATE,
  QUIZ_SUBMIT,
  QUIZ_FETCH,
  QUIZ_CLEAR,
  QUIZ_CREATE_CLEAR,
  QUIZ_FETCH_CLEAR,
  QUIZ_SUBMIT_CLEAR,
} from "./quiz.type";

const initialState = {
  createdQuiz: {},
  submittedQuiz: {},
  allAttemptedQuizs: [],
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUIZ_CREATE:
      return {
        ...state,
        createdQuiz: action.payload,
      };
    case QUIZ_SUBMIT:
      return {
        ...state,
        submittedQuiz: action.payload,
      };
    case QUIZ_FETCH:
      return {
        ...state,
        allAttemptedQuizs: action.payload,
      };

    case QUIZ_CREATE_CLEAR:
      return {
        createdQuiz: [],
      };
    case QUIZ_FETCH_CLEAR:
      return {
        allAttemptedQuizs: [],
      };
    case QUIZ_SUBMIT_CLEAR:
      return {
        submittedQuiz: {},
      };
    case QUIZ_CLEAR:
      return {
        createdQuiz: [],
        submittedQuiz: {},
        allAttemptedQuizs: [],
      };
    default:
      return {
        ...state,
      };
  }
};

export default quizReducer;
