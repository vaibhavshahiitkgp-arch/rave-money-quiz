import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Mascot from "../components/Mascot";
import { useQuiz } from "../state/QuizContext";
import { getTier, mascotMouth } from "../data/tiers";

const SHAPES = [
  { top: 16, left: 22, size: 14, shape: "diamond", color: "var(--gold-accent)", anim: "floatSlow 4.5s ease-in-out infinite" },
  { top: 36, right: 26, size: 10, shape: "circle", color: "oklch(58% 0.14 45)", anim: "floatSlow2 5.2s ease-in-out infinite" },
  { top: 80, left: 36, size: 8, shape: "circle", color: "#E3B23C", anim: "floatSlow 4s ease-in-out infinite" },
  { top: 120, right: 44, size: 9, shape: "diamond", color: "var(--gold-accent)", anim: "floatSlow2 4.6s ease-in-out infinite" },
  { bottom: 150, left: 16, size: 14, shape: "circle", color: "var(--gold-accent)", anim: "floatSlow2 4s ease-in-out infinite" },
  { bottom: 190, right: 20, size: 16, shape: "square", color: "oklch(58% 0.14 45 / 0.7)", anim: "floatSlow 6s ease-in-out infinite" },
  { bottom: 110, right: 60, size: 8, shape: "circle", color: "#E3B23C", anim: "floatSlow2 5s ease-in-out infinite" },
];

export default function Score() {
  const navigate = useNavigate();
  const { submitted, score, total } = useQuiz();

  useEffect(() => {
    if (!submitted) navigate("/", { replace: true });
  }, [submitted, navigate]);

  if (!submitted) return null;

  const tier = getTier(score, total);
  const pct = Math.round((score / total) * 100);
  const mouth = mascotMouth(tier.name);

  return (
    <div
      className="card-shell"
      style={{
        padding: "30px 22px",
        gap: 28,
        alignItems: "center",
        justifyContent: "space-between",
        textAlign: "center",
        background: "var(--green-tint)",
        minHeight: 620,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {SHAPES.map((s, i) => (
        <div
          key={i}
          className="float-shape"
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            bottom: s.bottom,
            width: s.size,
            height: s.size,
            borderRadius: s.shape === "circle" ? "50%" : 0,
            transform: s.shape === "diamond" ? "rotate(45deg)" : s.shape === "square" ? "rotate(20deg)" : undefined,
            background: s.color,
            animation: s.anim,
          }}
        />
      ))}

      <div style={{ fontSize: 12, letterSpacing: 1.5, color: "oklch(35% 0.06 150)", fontWeight: 700, textTransform: "uppercase", position: "relative", zIndex: 1 }}>
        Your Result
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, position: "relative", zIndex: 1 }}>
        <div
          className="anim-popIn"
          style={{
            position: "relative",
            width: 172,
            height: 172,
            borderRadius: "50%",
            background: `conic-gradient(oklch(58% 0.14 45) 0%, oklch(58% 0.14 45) ${pct}%, oklch(87% 0.03 150) ${pct}%, oklch(87% 0.03 150) 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 138, height: 138, borderRadius: "50%", background: "var(--green-tint)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Mascot size={74} ribbonColor={tier.ribbon} mouth={mouth} sparkle={tier.name === "Money Master"} dashedRing />
          </div>
          <div style={{ position: "absolute", bottom: -4, background: "var(--green-tint)", padding: "3px 14px", borderRadius: 12, fontFamily: "Fredoka, sans-serif", fontWeight: 700, fontSize: 18, color: "var(--ink)" }}>
            {score}/{total}
          </div>
        </div>

        <div className="anim-slideUp" style={{ animationDelay: "0.15s", position: "relative", padding: "11px 26px", background: tier.ribbon, transform: "rotate(-1.5deg)", boxShadow: `0 4px 0 ${tier.shadow}` }}>
          <div style={{ position: "absolute", left: -10, top: 0, width: 0, height: 0, borderTop: `21px solid ${tier.ribbon}`, borderLeft: "10px solid transparent" }} />
          <div style={{ position: "absolute", right: -10, top: 0, width: 0, height: 0, borderTop: `21px solid ${tier.ribbon}`, borderRight: "10px solid transparent" }} />
          <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 700, fontSize: 18, color: "#fff", letterSpacing: 0.3, textTransform: "uppercase" }}>{tier.name}</div>
        </div>
        <div className="anim-slideUp" style={{ animationDelay: "0.25s", fontWeight: 600, fontSize: 14, color: "var(--muted)", maxWidth: 270, lineHeight: 1.5 }}>
          {tier.message}
        </div>
      </div>

      <button className="btn3d btn3d--green" style={{ position: "relative", zIndex: 1 }} onClick={() => navigate("/options")}>
        Continue
      </button>
    </div>
  );
}
