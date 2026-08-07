import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Brand from "../components/Brand";
import ProgressBar from "../components/ProgressBar";
import { useQuiz } from "../state/QuizContext";

const LETTERS = ["A", "B", "C", "D"];

export default function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const { questions, total, answers, setAnswer } = useQuiz();

  const firstUnansweredIndex = questions.findIndex((q) => answers[q.id] === undefined);
  const startIndex = location.state?.index ?? (firstUnansweredIndex === -1 ? 0 : firstUnansweredIndex);

  const [index, setIndex] = useState(startIndex);
  const question = questions[index];
  const [selected, setSelected] = useState(question ? answers[question.id] : undefined);

  useEffect(() => {
    if (total === 0) navigate("/", { replace: true });
  }, [total, navigate]);

  useEffect(() => {
    setSelected(question ? answers[question.id] : undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  if (!question) return null;

  function commitAndGo(nextIndex) {
    if (selected !== undefined) setAnswer(question.id, selected);
    if (nextIndex >= total) {
      navigate("/review");
    } else {
      setIndex(nextIndex);
    }
  }

  const isLast = index === total - 1;

  return (
    <div className="screen">
      <Brand />
      <ProgressBar current={index + 1} total={total} />

      <span className="tag">{question.topic}</span>
      <p className="question-text">{question.text}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {question.options.map((opt, i) => (
          <button
            key={i}
            className={`option ${selected === i ? "option--selected" : ""}`}
            onClick={() => setSelected(i)}
          >
            <span className="option__letter">{LETTERS[i]}</span>
            <span className="option__text">{opt}</span>
          </button>
        ))}
      </div>

      <div style={{ marginTop: "auto" }} className="btn-row">
        <button className="btn btn--ghost" disabled={index === 0} onClick={() => commitAndGo(index - 1)}>
          Prev
        </button>
        <button className="btn btn--primary" onClick={() => commitAndGo(index + 1)}>
          {isLast ? "Review" : selected === undefined ? "Skip" : "Confirm & Next"}
        </button>
      </div>
    </div>
  );
}
