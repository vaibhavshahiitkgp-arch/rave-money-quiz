import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../state/QuizContext";
import { getTier } from "../data/tiers";
import { getStrings } from "../data/strings";
import { isValidIndianMobile, isValidName, normalizeIndianMobile } from "../utils/validate";
import { submitLead } from "../utils/api";
import Mascot from "../components/Mascot";

export default function SolutionGate() {
  const navigate = useNavigate();
  const { submitted, answers, score, total, language, weakTopics, unlockDetailed, sessionId } = useQuiz();
  const t = getStrings(language);
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!submitted) navigate("/", { replace: true });
  }, [submitted, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValidName(name)) {
      setError(t.solutionGate.errorName);
      return;
    }
    if (!isValidIndianMobile(whatsapp)) {
      setError(t.solutionGate.errorPhone);
      return;
    }
    setError("");

    const tier = getTier(score, total);
    const contact = { name: name.trim(), whatsapp: normalizeIndianMobile(whatsapp) };

    submitLead({
      sessionId,
      name: contact.name,
      whatsapp: contact.whatsapp,
      language,
      score,
      total,
      tier: tier.name,
      weakTopics,
      answers,
      submittedAt: new Date().toISOString(),
    });

    unlockDetailed(contact);
    navigate("/score");
  }

  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="card-shell" style={{ padding: "30px 26px", gap: 24, position: "relative" }}>
      {/* A real, data-driven preview of the score ring -- blurred just enough
          to hide the actual number while still showing something is there
          to claim. Peeks from the top corner like the app's other
          corner-bleed decoration, clipped by the card's own overflow:hidden. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -70,
          right: -70,
          width: 210,
          height: 210,
          borderRadius: "50%",
          background: `conic-gradient(oklch(58% 0.14 45) 0%, oklch(58% 0.14 45) ${pct}%, oklch(90% 0.015 70) ${pct}%, oklch(90% 0.015 70) 100%)`,
          filter: "blur(6px)",
          opacity: 0.5,
          zIndex: 0,
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 18, position: "relative", zIndex: 1 }}>
        <button className="back-link" onClick={() => navigate("/post-submit")}>
          {t.solutionGate.back}
        </button>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center" }}>
          <Mascot size={92} pose="envelope" mouth="smile" animate className="anim-popIn" style={{ filter: "drop-shadow(0 8px 6px rgba(0,0,0,.15))" }} />
          <div style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 700, color: "var(--ink)" }}>{t.solutionGate.title}</div>
          <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.5, maxWidth: 280 }}>{t.solutionGate.body}</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label className="field-label" htmlFor="name">{t.solutionGate.nameLabel}</label>
            <input id="name" className="field-input" type="text" placeholder={t.solutionGate.namePlaceholder} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label className="field-label" htmlFor="whatsapp">{t.solutionGate.whatsappLabel}</label>
            <input id="whatsapp" className="field-input" type="tel" inputMode="numeric" placeholder={t.solutionGate.whatsappPlaceholder} value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
          </div>
          {error && <div className="field-error">{error}</div>}
          <button className="btn3d btn3d--green" type="submit">
            {t.solutionGate.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
