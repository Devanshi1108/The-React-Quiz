import { useQuiz } from "./QuizContextProvider";

export default function Options() {
  const { questions, index, dispatch, selectedAns } = useQuiz();
  const hasAnswered = selectedAns !== null;
  const curQuestion = questions[index];
  return (
    <div className="options">
      {curQuestion.options.map((el, i) => (
        <button
          className={`btn btn-option ${
            i === selectedAns && hasAnswered ? "answer" : ""
          }  ${
            hasAnswered
              ? i === curQuestion.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswered ? true : false}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
          key={i}
        >
          {el}
        </button>
      ))}
    </div>
  );
}
