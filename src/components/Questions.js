import Options from "./Options";
import { useQuiz } from "./QuizContextProvider";
export default function Questions() {
  const { questions, index } = useQuiz();
  return (
    <>
      <h4>{questions[index].question}</h4>
      <Options />
    </>
  );
}
