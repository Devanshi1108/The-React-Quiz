import { createContext, useContext } from "react";
import { useEffect, useReducer } from "react";

const SECS_PER_QUE = 30;

const QuizContext = createContext();

const initialState = {
  questions: [],
  status: "loading", //loading,error,ready,active,finished
  index: 0,
  selectedAns: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUE,
      };
    case "newAnswer":
      const curQuestion = state.questions[state.index];
      return {
        ...state,
        selectedAns: action.payload,
        points:
          action.payload === curQuestion.correctOption
            ? state.points + curQuestion.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, selectedAns: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.highScore < state.points ? state.points : state.highScore,
      };

    case "restart":
      return {
        ...state,
        status: "ready",
        index: 0,
        selectedAns: null,
        points: 0,
        secondsRemaining: null,
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action is unknown");
  }
}

function QuizContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    selectedAns,
    points,
    highScore,
    secondsRemaining,
  } = state;

  const numQuestions = questions.length;
  const totalPoints = questions.reduce((sum, el) => {
    return el.points + sum;
  }, 0);

  useEffect(function () {
    fetch(`http://localhost:8000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        numQuestions,
        dispatch,
        index,
        totalPoints,
        points,
        status,
        selectedAns,
        secondsRemaining,
        highScore,
        questions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("Quiz context used outside oh it's providers scope");
  return context;
}

export { QuizContextProvider, useQuiz };
