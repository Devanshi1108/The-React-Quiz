import { useQuiz } from "./QuizContextProvider";

export default function ProgressBar() {
  const { numQuestions, index, totalPoints, points, answer } = useQuiz();
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
