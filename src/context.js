import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url = "";
const temporaryUrl =
  "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);

    const response = await axios(url).catch((error) => console.log(error));

    if (response) {
      const data = response.data.results;

      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      }
    } else {
      setWaiting(true);
      setError(true);
    }
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const newIndex = oldIndex + 1;

      if (newIndex > questions.length - 1) {
        // open modal
        return 0;
      } else return newIndex;
    });
  };

  useEffect(() => {
    fetchQuestions(temporaryUrl);
  }, []);

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestion,
      }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
