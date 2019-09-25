import * as QuestionsUtils from "../util/questions_util";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";

const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
};

export const fetchQuestions = () => {
  return (dispatch) => {
    return QuestionsUtils.fetchQuestions().then((data) => {
      console.log(data);
      return dispatch(receiveQuestions(data.data.questions));
    });
  };
};