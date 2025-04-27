export default function ProgressBar({
  numQuestions,
  index,
  totalPoints,
  points,
  answer,
}) {
  return (
    <div className="progress">
      <progress
        max={numQuestions}
        value={answer != null ? index + 1 : index}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints}
      </p>
    </div>
  );
}
