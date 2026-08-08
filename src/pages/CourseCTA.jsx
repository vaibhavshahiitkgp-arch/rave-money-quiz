import { useNavigate } from "react-router-dom";
import { RAVE_EMAIL } from "../utils/whatsapp";

// PLACEHOLDER curriculum — matches the approved design prototype's placeholder
// bullets verbatim. Swap for RAVE Finance Labs' real 12-week outline when
// supplied (a fuller version exists in earlier project material).
const BULLETS = [
  "Weeks 1–3: Money mindset & budgeting foundations",
  "Weeks 4–6: Saving, insurance & protecting what you build",
  "Weeks 7–9: Stocks, mutual funds & how markets actually work",
  "Weeks 10–12: Building your own long-term investing plan",
];

export default function CourseCTA() {
  const navigate = useNavigate();

  function handleBack() {
    navigate("/options");
  }

  return (
    <div className="card-shell blob-bg blob-bg--b" style={{ padding: "30px 26px", gap: 28 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <button className="back-link" onClick={handleBack}>
          &lsaquo; Back
        </button>
        <div style={{ fontFamily: "Fredoka, sans-serif", fontSize: 19, fontWeight: 700, color: "var(--ink)", lineHeight: 1.4 }}>
          Want to learn more about investing and finance?
        </div>
        <div style={{ fontSize: 14, color: "var(--ink)", fontWeight: 700 }}>Learn from an expert.</div>
        <div style={{ background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,.05)", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>Investing as a Life Skill</div>
          <div style={{ fontSize: 12.5, color: "var(--muted-soft)" }}>A 12-week course by RAVE Finance Labs — placeholder curriculum below, swap for the real outline.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
            {BULLETS.map((b, i) => (
              <div key={i} style={{ fontSize: 13, color: "oklch(35% 0.02 260)" }}>
                • {b}
              </div>
            ))}
          </div>
        </div>
      </div>
      <a
        href={`mailto:${RAVE_EMAIL}?subject=Investing%20as%20a%20Life%20Skill`}
        className="btn3d btn3d--green"
      >
        Know More
      </a>
    </div>
  );
}
