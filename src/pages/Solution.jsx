import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../state/QuizContext";
import { getStrings } from "../data/strings";

const LETTERS = ["A", "B", "C", "D"];

export default function Solution() {
  const navigate = useNavigate();
  const { submitted, detailedUnlocked, questions, answers, language } = useQuiz();
  const [expandedId, setExpandedId] = useState(null);
  const t = getStrings(language);

  useEffect(() => {
    if (!submitted) navigate("/", { replace: true });
    else if (!detailedUnlocked) navigate("/solution-gate", { replace: true });
  }, [submitted, detailedUnlocked, navigate]);

  if (!detailedUnlocked) return null;

  return (
    <div className="card-shell">
      <div style={{ padding: "20px 22px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
        <button className="back-link" onClick={() => navigate("/score")}>
          {t.solution.back}
        </button>
        <div style={{ fontFamily: "Fredoka, sans-serif", fontSize: 19, fontWeight: 700, color: "var(--ink)" }}>{t.solution.title}</div>
        <div style={{ fontSize: 12.5, color: "var(--muted-soft)" }}>{t.solution.subtitle}</div>
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
                <span className="solution-row-label">{t.solution.question(i + 1)}</span>
                <span className="solution-chevron">{expanded ? "⌃" : "⌄"}</span>
              </button>
              {expanded && (
                <div className="solution-detail">
                  <div className="solution-detail__q">{q.text}</div>
                  <div className="solution-detail__answer">
                    {t.solution.yourAnswer}{" "}
                    <b style={{ color: "var(--ink)" }}>
                      {chosen === undefined ? t.solution.notAnswered : `${LETTERS[chosen]}. ${q.options[chosen]}`}
                    </b>
                  </div>
                  {!isCorrect && (
                    <div className="solution-detail__answer">
                      {t.solution.correctAnswer} <b style={{ color: "var(--green)" }}>{`${LETTERS[q.correctIndex]}. ${q.options[q.correctIndex]}`}</b>
                    </div>
                  )}
                  <div className="solution-explanation">{q.explanation}</div>
                </div>
              )}
            </div>
          );
        })}

        <div
          style={{
            borderTop: "2px solid oklch(91% 0.008 85)",
            marginTop: 8,
            paddingTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 700, fontSize: 15, color: "var(--muted)" }}>{t.solution.nextTitle}</div>
          <button className="btn3d btn3d--outline" style={{ maxWidth: 280 }} onClick={() => navigate("/share")}>
            {t.solution.shareBtn}
          </button>
          <button className="btn3d btn3d--outline" style={{ maxWidth: 280 }} onClick={() => navigate("/course")}>
            {t.solution.courseBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
