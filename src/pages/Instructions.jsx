import { useNavigate } from "react-router-dom";
import Brand from "../components/Brand";
import { useQuiz } from "../state/QuizContext";

export default function Instructions() {
  const navigate = useNavigate();
  const { total } = useQuiz();

  return (
    <div className="screen">
      <Brand />
      <h2>Before you start</h2>
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <p>📝 Plain multiple-choice questions ({total} of them). No calculator needed.</p>
        <p>🚫 Please don&apos;t Google it or ask an AI — this is meant to reflect what you already know, not what you can look up.</p>
        <p>😌 Nobody is grading this and no score is shared with anyone else. It&apos;s just for you.</p>
        <p>✅ You can move back and forth between questions and change your answers freely, right up until you hit Final Submit.</p>
      </div>
      <div style={{ marginTop: "auto" }}>
        <button className="btn btn--primary" onClick={() => navigate("/quiz")}>
          I&apos;m ready — let&apos;s go
        </button>
      </div>
    </div>
  );
}
