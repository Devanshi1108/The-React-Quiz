export default function Options({ curQuestion, dispatch, selectedAns }) {
  const hasAnswered = selectedAns !== null;
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
