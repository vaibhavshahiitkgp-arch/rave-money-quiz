import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../state/QuizContext";

export default function Options() {
  const navigate = useNavigate();
  const { submitted, detailedUnlocked } = useQuiz();

  useEffect(() => {
    if (!submitted) navigate("/", { replace: true });
  }, [submitted, navigate]);

  if (!submitted) return null;

  return (
    <div className="card-shell dot-grid" style={{ padding: "28px 24px", gap: 16 }}>
      <div style={{ fontFamily: "Fredoka, sans-serif", fontSize: 20, fontWeight: 700, color: "var(--ink)" }}>What&apos;s next?</div>

      <button className="hub-card hub-card--solution" onClick={() => navigate(detailedUnlocked ? "/solution" : "/solution-gate")}>
        <div className="hub-card__title">Want the detailed solution?</div>
        <div className="hub-card__desc">See what you got right, what you missed, and why — question by question. Just need your name and WhatsApp number.</div>
        <div className="hub-card__cta">{detailedUnlocked ? "View ›" : "Unlock ›"}</div>
      </button>

      <button className="hub-card hub-card--share" onClick={() => navigate("/share")}>
        <div className="hub-card__title">Share your score</div>
        <div className="hub-card__desc">Challenge a friend to see if they can beat you.</div>
        <div className="hub-card__cta">Share &rsaquo;</div>
      </button>

      <button className="hub-card hub-card--course" onClick={() => navigate("/course")}>
        <div className="hub-card__title">Want to go further? Learn to invest</div>
        <div className="hub-card__desc">Investing as a Life Skill — a 12-week course from RAVE Finance Labs.</div>
        <div className="hub-card__cta">Explore the course &rsaquo;</div>
      </button>
    </div>
  );
}
