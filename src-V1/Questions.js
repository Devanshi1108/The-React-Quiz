import Options from "./Options";
export default function Questions({ curQuestion, dispatch, selectedAns }) {
  return (
    <>
      <h4>{curQuestion.question}</h4>
      <Options
        curQuestion={curQuestion}
        dispatch={dispatch}
        selectedAns={selectedAns}
      />
    </>
  );
}
