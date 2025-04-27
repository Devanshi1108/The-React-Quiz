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
import { useQuiz } from "./QuizContextProvider.js";

export default function App() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <ProgressBar />
            <Questions />
            <footer>
              <Timer />
              <NextButton />
            </footer>
          </>
        )}

        {status === "finished" && <Finish />}
      </Main>
    </div>
  );
}
