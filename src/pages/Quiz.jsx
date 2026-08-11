import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getStrings } from "../data/strings";
import { useQuiz } from "../state/QuizContext";

const LETTERS = ["A", "B", "C", "D"];

export default function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const { questions, total, answers, setAnswer, language } = useQuiz();
  const t = getStrings(language);
  const currentChipRef = useRef(null);
  const [showJumpSheet, setShowJumpSheet] = useState(false);

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

  useEffect(() => {
    currentChipRef.current?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [index]);

  if (!question) return null;

  // Jumping to an arbitrary question (not just ±1) reuses the same commit
  // logic — Prev/Next and the jump strip both just call this with a target.
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
      <div style={{ padding: "18px 22px 12px", display: "flex", flexDirection: "column", gap: 9, boxShadow: "0 4px 10px -6px rgba(0, 0, 0, 0.14)", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13, color: "var(--muted)" }}>
            {t.quiz.questionOf(index + 1, total)}
          </div>
          <button className="jump-trigger" onClick={() => setShowJumpSheet(true)}>
            {t.quiz.allQuestions}
          </button>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {showJumpSheet && (
        <div className="jump-sheet-backdrop" onClick={() => setShowJumpSheet(false)}>
          <div className="jump-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="jump-sheet-header">
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "var(--ink)" }}>
                {t.quiz.allQuestions}
              </div>
              <button className="jump-sheet-close" onClick={() => setShowJumpSheet(false)} aria-label={t.quiz.close}>
                ✕
              </button>
            </div>
            <div className="jump-sheet-grid">
              {questions.map((q, i) => {
                const isCurrent = i === index;
                const isAnswered = answers[q.id] !== undefined;
                return (
                  <button
                    key={q.id}
                    ref={isCurrent ? currentChipRef : null}
                    className={`quiz-jump-chip ${isAnswered ? "quiz-jump-chip--answered" : ""} ${isCurrent ? "quiz-jump-chip--current" : ""}`}
                    onClick={() => {
                      setShowJumpSheet(false);
                      commitAndGo(i);
                    }}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 22px 8px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div key={question.id} className="question-card anim-popIn">
          <div className="question-text">{question.text}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {question.options.map((opt, i) => (
            <button
              key={question.id + "-" + i}
              className={`option-row anim-slideUp ${selected === i ? "option-row--selected" : ""}`}
              style={{ animationDelay: `${0.15 + i * 0.09}s` }}
              onClick={() => setSelected(i)}
            >
              <span className="option-letter">{LETTERS[i]}</span>
              <span className="option-text">{opt}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, padding: "14px 22px 22px", boxShadow: "0 -4px 10px -6px rgba(0, 0, 0, 0.14)" }}>
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
