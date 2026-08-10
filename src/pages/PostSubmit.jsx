import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Mascot from "../components/Mascot";
import { getStrings } from "../data/strings";
import { useQuiz } from "../state/QuizContext";

export default function PostSubmit() {
  const navigate = useNavigate();
  const { submitted, language } = useQuiz();
  const t = getStrings(language);

  useEffect(() => {
    if (!submitted) navigate("/", { replace: true });
  }, [submitted, navigate]);

  if (!submitted) return null;

  return (
    <div
      className="card-shell"
      style={{
        padding: "40px 26px",
        gap: 36,
        alignItems: "center",
        justifyContent: "space-between",
        textAlign: "center",
        background: "var(--green-tint)",
        minHeight: 460,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="float-shape" style={{ top: 30, left: 24, width: 20, height: 20, borderRadius: "50%", background: "var(--gold-accent)", animation: "floatSlow 4.6s ease-in-out infinite" }} />
      <div className="float-shape" style={{ top: 60, right: 30, width: 16, height: 16, transform: "rotate(30deg)", background: "oklch(58% 0.14 45 / 0.6)", animation: "floatSlow2 5s ease-in-out infinite" }} />
      <div className="float-shape" style={{ bottom: 170, left: 20, width: 14, height: 14, transform: "rotate(45deg)", background: "oklch(58% 0.14 45 / 0.5)", animation: "floatSlow2 5.5s ease-in-out infinite" }} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, position: "relative", zIndex: 1 }}>
        <Mascot size={92} mouth="smile" className="anim-popIn" style={{ filter: "drop-shadow(0 10px 8px rgba(0,0,0,.18))" }} />
        <div style={{ fontFamily: "Fredoka, sans-serif", fontSize: 23, fontWeight: 700, color: "var(--ink)" }}>{t.postSubmit.title}</div>
        <div style={{ fontSize: 14, color: "oklch(35% 0.06 150)", maxWidth: 260, lineHeight: 1.5, fontWeight: 700 }}>{t.postSubmit.subtitle}</div>
      </div>

      <button className="btn3d btn3d--green" style={{ position: "relative", zIndex: 1 }} onClick={() => navigate("/score")}>
        {t.postSubmit.seeScore}
      </button>
    </div>
  );
}
