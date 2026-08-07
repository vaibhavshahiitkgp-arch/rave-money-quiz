import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Brand from "../components/Brand";
import { useQuiz } from "../state/QuizContext";
import { getTier } from "../data/tiers";

const TIER_MESSAGES = {
  "Money Curious": "You're just getting started — and that's exactly why this quiz is worth taking.",
  "Money Aware": "You know the basics. There's a solid foundation here to build on.",
  "Money Confident": "A solid grasp of the fundamentals — well done.",
  "Money Expert": "Impressive — you clearly know your way around money.",
  "Money Master": "Perfect score! You've mastered every topic in this quiz.",
};

export default function Score() {
  const navigate = useNavigate();
  const { submitted, score, total, detailedUnlocked } = useQuiz();

  useEffect(() => {
    if (!submitted) navigate("/", { replace: true });
  }, [submitted, navigate]);

  if (!submitted) return null;

  const tier = getTier(score, total);

  return (
    <div className="screen center">
      <Brand />

      <div className="card">
        <div className="score-big">
          {score}/{total}
        </div>
        <div className="tier-name">{tier.name}</div>
        <p style={{ marginTop: 10 }}>{TIER_MESSAGES[tier.name]}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
        <button
          className="btn btn--primary"
          onClick={() => navigate(detailedUnlocked ? "/solution" : "/solution-gate")}
        >
          {detailedUnlocked ? "View detailed solution" : "Want the detailed solution?"}
        </button>
        <button className="btn btn--secondary" onClick={() => navigate("/share")}>
          Share your score
        </button>
      </div>

      <div style={{ marginTop: "auto" }}>
        <button className="btn btn--ghost" onClick={() => navigate("/course")}>
          Want to learn more? Explore our course
        </button>
      </div>
    </div>
  );
}
