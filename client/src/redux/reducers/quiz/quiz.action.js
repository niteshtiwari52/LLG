import axios from "axios";
import {
  QUIZ_CLEAR,
  QUIZ_CREATE,
  QUIZ_CREATE_CLEAR,
  QUIZ_FETCH,
  QUIZ_SUBMIT,
  QUIZ_SUBMIT_CLEAR,
} from "./quiz.type";

export const createNewQuizAction = (data) => async (dispatch) => {
  try {
    const newQuiz = await axios({
      method: "POST",
      url: `http://localhost:4000/api/v1/quiz/create-quiz`,
      data: { ...data },
    });

    return dispatch({ type: QUIZ_CREATE, payload: newQuiz.data });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

export const submitQuizAction = (submittedQuiz) => async (dispatch) => {
  try {
    console.log(submittedQuiz);
    const submissionResult = await axios({
      method: "POST",
      url: `http://localhost:4000/api/v1/quiz/submit-quiz`,
      data: { submittedQuiz: submittedQuiz },
    });

    return dispatch({ type: QUIZ_SUBMIT, payload: submissionResult.data });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

export const fetchAllAttemptedQuizesAction = () => async (dispatch) => {
  try {
    const allAttemptedQuizesData = await axios({
      method: "GET",
      url: `http://localhost:4000/api/v1/quiz/allattemptedquizes`,
    });
    //   console.log(UserDetails.data);
    return dispatch({
      type: QUIZ_FETCH,
      payload: allAttemptedQuizesData.data.allAttemptedQuizes,
    });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};
export const clearQuizAction = () => async (dispatch) => {
  try {
    return dispatch({ type: QUIZ_CLEAR, payload: {} });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};
export const clearCreateQuizAction = () => async (dispatch) => {
  try {
    return dispatch({ type: QUIZ_CREATE_CLEAR, payload: {} });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};
export const clearSubmitQuizAction = () => async (dispatch) => {
  try {
    return dispatch({ type: QUIZ_SUBMIT_CLEAR, payload: {} });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};
