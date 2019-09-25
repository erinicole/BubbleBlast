import axios from "axios";

export const fetchQuestions = () => {

  return axios.get("/api/questions");
};

// export const createQuestion = (question) => {
//   return axios.post("/api/questions", question);
//   // $.ajax({
//   //   method: "POST",
//   //   url: "/api/questions/",
//   //   data: question,
//   //   success: (data) => {
//   //     console.log(data);
//   //   }
//   // })
// };
