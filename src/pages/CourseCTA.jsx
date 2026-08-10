import { useNavigate } from "react-router-dom";
import { useQuiz } from "../state/QuizContext";
import { getStrings } from "../data/strings";
import { RAVE_EMAIL } from "../utils/whatsapp";

export default function CourseCTA() {
  const navigate = useNavigate();
  const { language } = useQuiz();
  const t = getStrings(language);

  return (
    <div className="card-shell blob-bg blob-bg--b" style={{ padding: "30px 26px", gap: 28 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <button className="back-link" onClick={() => navigate("/solution")}>
          {t.course.back}
        </button>
        <div style={{ fontFamily: "Fredoka, sans-serif", fontSize: 19, fontWeight: 700, color: "var(--ink)", lineHeight: 1.4 }}>
          {t.course.title}
        </div>
        <div style={{ fontSize: 14, color: "var(--ink)", fontWeight: 700 }}>{t.course.subtitle}</div>
        <div style={{ background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,.05)", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>Investing as a Life Skill</div>
          {/* PLACEHOLDER curriculum bullets — swap for RAVE Finance Labs' real
              12-week outline when supplied (a fuller version exists in
              earlier project material). Kept internal-only; do not expose
              "placeholder" language to end users. */}
          <div style={{ fontSize: 12.5, color: "var(--muted-soft)" }}>{t.course.courseDesc}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
            {t.course.bullets.map((b, i) => (
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
        {t.course.knowMore}
      </a>
    </div>
  );
}
