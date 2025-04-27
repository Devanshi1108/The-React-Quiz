export default function Finish({ points, totalPoints, highScore, dispatch }) {
  const percentage = (points / totalPoints) * 100;
  return (
    <main className="main">
      <p className="result">
        <span>👀</span> You scored <strong>{points} </strong> out of{" "}
        {totalPoints} ({percentage.toFixed(2)} %)
      </p>
      <p className="highscore">( Highscore: {highScore} points )</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </main>
  );
}
