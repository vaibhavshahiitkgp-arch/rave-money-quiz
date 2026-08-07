import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Brand from "../components/Brand";
import { useQuiz } from "../state/QuizContext";

export default function PostSubmit() {
  const navigate = useNavigate();
  const { submitted } = useQuiz();

  useEffect(() => {
    if (!submitted) navigate("/", { replace: true });
  }, [submitted, navigate]);

  return (
    <div className="screen center">
      <Brand />
      <div style={{ marginTop: "auto", marginBottom: "auto" }}>
        <div style={{ fontSize: 64 }}>🎉</div>
        <h1>Nicely done!</h1>
        <p>You've finished the Money Money Quiz. Let&apos;s see how you did.</p>
      </div>
      <button className="btn btn--primary" onClick={() => navigate("/score")}>
        See my score
      </button>
    </div>
  );
}
