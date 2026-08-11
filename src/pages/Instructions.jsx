import { useNavigate } from "react-router-dom";
import Mascot from "../components/Mascot";
import { getStrings } from "../data/strings";
import { useQuiz } from "../state/QuizContext";

export default function Instructions() {
  const navigate = useNavigate();
  const { language } = useQuiz();
  const t = getStrings(language);

  return (
    <div className="card-shell" style={{ padding: "32px 26px", gap: 28, position: "relative", overflow: "hidden", justifyContent: "space-between" }}>
      <div className="float-shape" style={{ top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "oklch(93% 0.04 150 / 0.6)" }} />
      <div className="float-shape" style={{ top: 36, right: 34, width: 30, height: 30, borderRadius: 8, transform: "rotate(18deg)", background: "oklch(58% 0.14 45 / 0.18)", animation: "floatSlow 5s ease-in-out infinite" }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 22, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="anim-slideUp" style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 700, color: "var(--ink)" }}>
            {t.instructions.title}
          </div>
          <Mascot size={44} mouth="smile" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, background: "var(--green-tint)", borderRadius: 20, padding: 18 }}>
          {t.instructions.rules.map((text, i) => (
            <div key={i} className="anim-slideUp" style={{ animationDelay: `${0.05 + i * 0.07}s`, display: "flex", gap: 13, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: i % 2 === 0 ? "var(--green)" : "var(--terracotta)",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                {i + 1}
              </div>
              <div style={{ fontSize: 15, color: "oklch(32% 0.02 260)", lineHeight: 1.5, paddingTop: 5 }}>{text}</div>
            </div>
          ))}
        </div>
      </div>
      <button className="btn3d btn3d--green" style={{ position: "relative", zIndex: 1 }} onClick={() => navigate("/quiz")}>
        {t.instructions.begin}
      </button>
    </div>
  );
}
