import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStrings } from "../data/strings";
import { useQuiz } from "../state/QuizContext";

export default function Review() {
  const navigate = useNavigate();
  const { questions, unansweredIds, submitQuiz, language } = useQuiz();
  const t = getStrings(language);

  useEffect(() => {
    if (unansweredIds.length === 0) {
      submitQuiz();
      navigate("/post-submit", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (unansweredIds.length === 0) return null;

  const unansweredNumbers = questions
    .map((q, i) => ({ id: q.id, num: i + 1 }))
    .filter(({ id }) => unansweredIds.includes(id));

  function handleSubmitAnyway() {
    submitQuiz();
    navigate("/post-submit");
  }

  return (
    <div className="card-shell" style={{ padding: "32px 26px", gap: 28 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ fontFamily: "Fredoka, sans-serif", fontSize: 20, fontWeight: 700, color: "var(--ink)" }}>{t.review.title}</div>
        <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>{t.review.body}</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {unansweredNumbers.map(({ num }) => (
            <button key={num} className="checkpoint-chip" onClick={() => navigate("/quiz", { state: { index: num - 1 } })}>
              {t.review.qLabel(num)}
            </button>
          ))}
        </div>
      </div>
      <button className="btn3d btn3d--green" onClick={handleSubmitAnyway}>
        {t.review.submitAnyway}
      </button>
    </div>
  );
}
