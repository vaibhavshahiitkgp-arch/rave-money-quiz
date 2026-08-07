import { useNavigate } from "react-router-dom";
import Brand from "../components/Brand";
import { useQuiz } from "../state/QuizContext";

export default function Review() {
  const navigate = useNavigate();
  const { questions, unansweredIds, submitQuiz } = useQuiz();

  const unansweredNumbers = questions
    .map((q, i) => ({ q, num: i + 1 }))
    .filter(({ q }) => unansweredIds.includes(q.id));

  function goToQuestion(index) {
    navigate("/quiz", { state: { index } });
  }

  function handleFinalSubmit() {
    submitQuiz();
    navigate("/post-submit");
  }

  return (
    <div className="screen">
      <Brand />
      <h2>Ready to submit?</h2>

      {unansweredNumbers.length > 0 ? (
        <div className="card">
          <p>
            You have {unansweredNumbers.length} unanswered question
            {unansweredNumbers.length > 1 ? "s" : ""}. You can leave them blank, or go back and
            answer them first.
          </p>
          <ul className="checkpoint-list">
            {unansweredNumbers.map(({ num }, i) => (
              <li key={num}>
                <button
                  onClick={() => goToQuestion(unansweredNumbers[i].num - 1)}
                  style={{ all: "unset", cursor: "pointer" }}
                >
                  Question {num}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="card">
          <p>All {questions.length} questions answered. This is it — once you submit, that&apos;s final.</p>
        </div>
      )}

      <div style={{ marginTop: "auto" }} className="btn-row">
        <button className="btn btn--ghost" onClick={() => navigate("/quiz", { state: { index: 0 } })}>
          Back to quiz
        </button>
        <button className="btn btn--primary" onClick={handleFinalSubmit}>
          Final Submit
        </button>
      </div>
    </div>
  );
}
