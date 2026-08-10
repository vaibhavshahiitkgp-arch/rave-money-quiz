import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getStrings } from "../data/strings";
import { useQuiz } from "../state/QuizContext";

const LETTERS = ["A", "B", "C", "D"];

export default function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const { questions, total, answers, setAnswer, language } = useQuiz();
  const t = getStrings(language);

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
  const pct = Math.round(((index + 1) / total) * 100);

  return (
    <div className="card-shell">
      <div style={{ padding: "18px 22px 12px", display: "flex", flexDirection: "column", gap: 9, borderBottom: "2px solid oklch(91% 0.008 85)" }}>
        <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 600, fontSize: 13, color: "var(--muted)" }}>
          {t.quiz.questionOf(index + 1, total)}
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 22px 8px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div key={question.id} className="question-card anim-popIn">
          <div className="question-text">{question.text}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {question.options.map((opt, i) => (
            <button
              key={question.id + "-" + i}
              className={`option-row anim-slideUp ${selected === i ? "option-row--selected" : ""}`}
              style={{ animationDelay: `${i * 0.06}s` }}
              onClick={() => setSelected(i)}
            >
              <span className="option-letter">{LETTERS[i]}</span>
              <span className="option-text">{opt}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, padding: "14px 22px 22px", borderTop: "2px solid oklch(91% 0.008 85)" }}>
        <button
          className={`btn3d ${index === 0 ? "btn3d--outline btn-disabled" : "btn3d--outline"}`}
          style={{ flex: 1 }}
          disabled={index === 0}
          onClick={() => commitAndGo(index - 1)}
        >
          {t.quiz.prev}
        </button>
        <button className="btn3d btn3d--green" style={{ flex: 2 }} onClick={() => commitAndGo(index + 1)}>
          {isLast ? t.quiz.reviewSubmit : t.quiz.next}
        </button>
      </div>
    </div>
  );
}
