import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Questions from "./Questions.js";
import NextButton from "./NextButton.js";
import ProgressBar from "./ProgressBar.js";
import Finish from "./Finish.js";
import Timer from "./Timer.js";

const SECS_PER_QUE = 30;

export default function App() {
  const initialState = {
    questions: [],
    status: "loading", //loading,error,ready,active,finished
    index: 0,
    selectedAns: null,
    points: 0,
    highScore: 0,
    secondsRemaining: null,
  };
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

  useEffect(function () {
    fetch(`http://localhost:8000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              numQuestions={numQuestions}
              index={index}
              totalPoints={totalPoints}
              points={points}
              answer={selectedAns}
            />
            <Questions
              curQuestion={questions[index]}
              dispatch={dispatch}
              selectedAns={selectedAns}
            />
            <footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={selectedAns}
                index={index}
                numQuestions={numQuestions}
              />
            </footer>
          </>
        )}

        {status === "finished" && (
          <Finish
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
