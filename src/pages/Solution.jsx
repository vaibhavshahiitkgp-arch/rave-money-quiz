import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../state/QuizContext";
import { getStrings } from "../data/strings";

const LETTERS = ["A", "B", "C", "D"];

export default function Solution() {
  const navigate = useNavigate();
  const { submitted, detailedUnlocked, questions, answers, language } = useQuiz();
  const [selectedId, setSelectedId] = useState(null);
  const detailRef = useRef(null);
  const t = getStrings(language);

  useEffect(() => {
    if (!submitted) navigate("/", { replace: true });
    else if (!detailedUnlocked) navigate("/solution-gate", { replace: true });
  }, [submitted, detailedUnlocked, navigate]);

  useEffect(() => {
    if (selectedId !== null) detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [selectedId]);

  if (!detailedUnlocked) return null;

  const selected = questions.find((q) => q.id === selectedId);

  function stateFor(q) {
    const chosen = answers[q.id];
    if (chosen === undefined) return "unanswered";
    return chosen === q.correctIndex ? "correct" : "incorrect";
  }

  return (
    <div className="card-shell">
      <div style={{ padding: "20px 22px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
        <button className="back-link" onClick={() => navigate("/score")}>
          {t.solution.back}
        </button>
        <div style={{ fontFamily: "var(--font-heading)", fontSize: 19, fontWeight: 700, color: "var(--ink)" }}>{t.solution.title}</div>
        <div style={{ fontSize: 12.5, color: "var(--muted-soft)" }}>{t.solution.subtitle}</div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "6px 22px 22px", display: "flex", flexDirection: "column", gap: 18 }}>
        <div className="solution-grid">
          {questions.map((q, i) => {
            const state = stateFor(q);
            const isSelected = selectedId === q.id;
            return (
              <button
                key={q.id}
                className={`solution-circle solution-circle--${state} ${isSelected ? "solution-circle--selected" : ""}`}
                onClick={() => setSelectedId(isSelected ? null : q.id)}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        {selected ? (
          (() => {
            const chosen = answers[selected.id];
            const isCorrect = chosen === selected.correctIndex;
            const state = stateFor(selected);
            const badgeChar = state === "unanswered" ? "–" : isCorrect ? "✓" : "✗";
            return (
              <div className="solution-card" style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8 }} ref={detailRef}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className={`solution-badge solution-badge--${state}`}>{badgeChar}</span>
                  <span className="solution-row-label">{t.solution.question(questions.indexOf(selected) + 1)}</span>
                </div>
                <div className="solution-detail__q">{selected.text}</div>
                <div className="solution-detail__answer">
                  {t.solution.yourAnswer}{" "}
                  <b style={{ color: "var(--ink)" }}>
                    {chosen === undefined ? t.solution.notAnswered : `${LETTERS[chosen]}. ${selected.options[chosen]}`}
                  </b>
                </div>
                {!isCorrect && (
                  <div className="solution-detail__answer">
                    {t.solution.correctAnswer} <b style={{ color: "var(--green)" }}>{`${LETTERS[selected.correctIndex]}. ${selected.options[selected.correctIndex]}`}</b>
                  </div>
                )}
                <div className="solution-explanation">{selected.explanation}</div>
              </div>
            );
          })()
        ) : (
          <div style={{ textAlign: "center", fontSize: 12.5, color: "var(--muted-soft)", padding: "4px 0" }}>{t.solution.subtitle}</div>
        )}

        <div
          style={{
            borderTop: "1px solid oklch(90% 0.008 85 / 0.7)",
            marginTop: 4,
            paddingTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "var(--muted)" }}>{t.solution.nextTitle}</div>
          <button
            className="btn3d"
            style={{ maxWidth: 280, background: "var(--terracotta)", boxShadow: "0 5px 0 var(--terracotta-shadow)" }}
            onClick={() => navigate("/course")}
          >
            {t.solution.courseBtn}
          </button>
          <button className="btn3d btn3d--outline" style={{ maxWidth: 280 }} onClick={() => navigate("/share")}>
            {t.solution.shareBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
