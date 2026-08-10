import { useNavigate } from "react-router-dom";
import Mascot from "../components/Mascot";
import { LANGUAGES } from "../data/languages";
import { getStrings } from "../data/strings";
import { useQuiz } from "../state/QuizContext";

export default function Landing() {
  const navigate = useNavigate();
  const { language, setLanguage, total } = useQuiz();
  const t = getStrings(language);

  return (
    <div className="card-shell dot-grid" style={{ padding: "36px 26px 30px", minHeight: 620, gap: 34 }}>
      <div className="float-shape" style={{ top: 26, left: 20, width: 34, height: 34, borderRadius: "50%", background: "oklch(45% 0.1 150 / 0.13)", animation: "floatSlow 5s ease-in-out infinite" }} />
      <div className="float-shape" style={{ top: 70, right: 24, width: 22, height: 22, borderRadius: 6, transform: "rotate(20deg)", background: "oklch(58% 0.14 45 / 0.16)", animation: "floatSlow2 4.2s ease-in-out infinite" }} />
      <div className="float-shape" style={{ bottom: 150, left: 30, width: 18, height: 18, transform: "rotate(45deg)", background: "oklch(72% 0.15 85 / 0.3)", animation: "floatSlow2 6s ease-in-out infinite" }} />
      <div className="float-shape" style={{ bottom: 210, right: 18, width: 26, height: 26, borderRadius: "50%", border: "3px solid oklch(45% 0.1 150 / 0.18)", animation: "spin20 14s linear infinite" }} />
      <div className="float-shape" style={{ top: 190, left: "50%", width: 220, height: 220, transform: "translateX(-50%)", borderRadius: "50%", background: "radial-gradient(oklch(85% 0.09 85 / 0.5), transparent 70%)" }} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 22, height: 26, background: "var(--green)", clipPath: "polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 4, flexShrink: 0 }}>
            <div style={{ color: "#fff", fontFamily: "Fredoka, sans-serif", fontWeight: 700, fontSize: 11 }}>R</div>
          </div>
          <div style={{ fontSize: 13, letterSpacing: 1, color: "var(--ink)", fontWeight: 800 }}>{t.brand.name}</div>
        </div>
        <div style={{ fontSize: 10.5, color: "var(--muted-soft)", fontWeight: 600 }}>{t.brand.tagline}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, position: "relative", zIndex: 1 }}>
        <div className="anim-popIn" style={{ fontFamily: "Fredoka, sans-serif", fontSize: 27, fontWeight: 700, color: "var(--ink)", lineHeight: 1.2, textAlign: "center" }}>
          {t.landing.titlePrefix}
          <span style={{ color: "oklch(45% 0.13 150)" }}>{t.landing.titleHighlight}</span>
          {t.landing.titleSuffix}
        </div>
        <Mascot size={82} animate style={{ filter: "drop-shadow(0 10px 8px rgba(0,0,0,.15))" }} />
        <div className="anim-slideUp" style={{ animationDelay: "0.15s", fontWeight: 700, fontSize: 14, color: "var(--muted)", maxWidth: 270, lineHeight: 1.5, textAlign: "center" }}>
          {t.landing.subtitle}
        </div>
      </div>

      <div className="anim-slideUp" style={{ animationDelay: "0.25s", display: "flex", flexDirection: "column", alignItems: "center", gap: 18, width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 9 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--muted-soft)", letterSpacing: 0.4, textTransform: "uppercase" }}>{t.landing.chooseLanguage}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                className={`lang-pill ${language === lang.code ? "lang-pill--active" : ""} ${!lang.available ? "lang-pill--disabled" : ""}`}
                onClick={() => lang.available && setLanguage(lang.code)}
                disabled={!lang.available}
              >
                {lang.label}
                {!lang.available && t.landing.comingSoon}
              </button>
            ))}
          </div>
        </div>
        <button className="btn3d btn3d--green" style={{ maxWidth: 280 }} onClick={() => navigate("/instructions")}>
          {t.landing.start}
        </button>
        <div style={{ fontSize: 12, color: "var(--muted-soft)", fontWeight: 600 }}>{t.landing.questionsCount(total)}</div>
      </div>
    </div>
  );
}
