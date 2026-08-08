import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../state/QuizContext";

const LETTERS = ["A", "B", "C", "D"];

export default function Solution() {
  const navigate = useNavigate();
  const { submitted, detailedUnlocked, questions, answers } = useQuiz();
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (!submitted) navigate("/", { replace: true });
    else if (!detailedUnlocked) navigate("/solution-gate", { replace: true });
  }, [submitted, detailedUnlocked, navigate]);

  if (!detailedUnlocked) return null;

  return (
    <div className="card-shell">
      <div style={{ padding: "20px 22px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
        <button className="back-link" onClick={() => navigate("/options")}>
          &lsaquo; Back
        </button>
        <div style={{ fontFamily: "Fredoka, sans-serif", fontSize: 19, fontWeight: 700, color: "var(--ink)" }}>Your Detailed Solution</div>
        <div style={{ fontSize: 12.5, color: "var(--muted-soft)" }}>Tap a question to see the explanation.</div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "6px 22px 22px", display: "flex", flexDirection: "column", gap: 8 }}>
        {questions.map((q, i) => {
          const chosen = answers[q.id];
          const isCorrect = chosen === q.correctIndex;
          const expanded = expandedId === q.id;
          const badgeClass = chosen === undefined ? "solution-badge--unanswered" : isCorrect ? "solution-badge--correct" : "solution-badge--incorrect";
          const badgeChar = chosen === undefined ? "–" : isCorrect ? "✓" : "✗";

          return (
            <div className="solution-card" key={q.id}>
              <button className="solution-row-header" onClick={() => setExpandedId(expanded ? null : q.id)}>
                <span className={`solution-badge ${badgeClass}`}>{badgeChar}</span>
                <span className="solution-row-label">Question {i + 1}</span>
                <span className="solution-chevron">{expanded ? "⌃" : "⌄"}</span>
              </button>
              {expanded && (
                <div className="solution-detail">
                  <div className="solution-detail__q">{q.text}</div>
                  <div className="solution-detail__answer">
                    Your answer:{" "}
                    <b style={{ color: "var(--ink)" }}>
                      {chosen === undefined ? "Not answered" : `${LETTERS[chosen]}. ${q.options[chosen]}`}
                    </b>
                  </div>
                  {!isCorrect && (
                    <div className="solution-detail__answer">
                      Correct answer: <b style={{ color: "var(--green)" }}>{`${LETTERS[q.correctIndex]}. ${q.options[q.correctIndex]}`}</b>
                    </div>
                  )}
                  <div className="solution-explanation">{q.explanation}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
