import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Brand from "../components/Brand";
import { useQuiz } from "../state/QuizContext";

const LETTERS = ["A", "B", "C", "D"];

export default function Solution() {
  const navigate = useNavigate();
  const { submitted, detailedUnlocked, questions, answers } = useQuiz();

  useEffect(() => {
    if (!submitted) navigate("/", { replace: true });
    else if (!detailedUnlocked) navigate("/solution-gate", { replace: true });
  }, [submitted, detailedUnlocked, navigate]);

  if (!detailedUnlocked) return null;

  return (
    <div className="screen">
      <Brand />
      <h2>Detailed solution</h2>

      <div>
        {questions.map((q, i) => {
          const chosen = answers[q.id];
          const isCorrect = chosen === q.correctIndex;
          return (
            <div className="solution-item" key={q.id}>
              <span className="tag">{q.topic}</span>
              <p className="question-text" style={{ marginTop: 8 }}>
                {i + 1}. {q.text}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {q.options.map((opt, oi) => {
                  let cls = "option";
                  if (oi === q.correctIndex) cls += " option--correct";
                  else if (oi === chosen) cls += " option--incorrect";
                  return (
                    <div className={cls} key={oi}>
                      <span className="option__letter">{LETTERS[oi]}</span>
                      <span className="option__text">{opt}</span>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: 8 }}>
                {chosen === undefined ? (
                  <span className="result-icon result-icon--incorrect">NOT ANSWERED</span>
                ) : isCorrect ? (
                  <span className="result-icon result-icon--correct">CORRECT</span>
                ) : (
                  <span className="result-icon result-icon--incorrect">INCORRECT</span>
                )}
              </div>

              <div className="explanation-box">{q.explanation}</div>
            </div>
          );
        })}
      </div>

      <div className="btn-row">
        <button className="btn btn--secondary" onClick={() => navigate("/share")}>
          Share your score
        </button>
        <button className="btn btn--primary" onClick={() => navigate("/course")}>
          Explore our course
        </button>
      </div>
    </div>
  );
}
