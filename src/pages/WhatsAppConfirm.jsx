import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../state/QuizContext";
import { getTier } from "../data/tiers";
import { getStrings } from "../data/strings";
import { buildConfirmMessage, buildWhatsAppLink } from "../utils/whatsapp";

export default function WhatsAppConfirm() {
  const navigate = useNavigate();
  const { submitted, detailedUnlocked, contact, score, total, language } = useQuiz();
  const t = getStrings(language);

  useEffect(() => {
    if (!submitted) navigate("/", { replace: true });
    else if (!detailedUnlocked) navigate("/solution-gate", { replace: true });
  }, [submitted, detailedUnlocked, navigate]);

  if (!detailedUnlocked || !contact) return null;

  const tier = getTier(score, total);
  const message = buildConfirmMessage({ name: contact.name, score, total, tierName: tier.name });

  return (
    <div className="card-shell blob-bg blob-bg--b" style={{ padding: "56px 26px 36px", gap: 40, alignItems: "center", textAlign: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <div style={{ fontFamily: "Fredoka, sans-serif", fontSize: 20, fontWeight: 700, color: "var(--ink)" }}>{t.whatsappConfirm.title}</div>
        <p style={{ fontSize: 14, color: "var(--muted)", maxWidth: 270, lineHeight: 1.6 }}>{t.whatsappConfirm.body}</p>
        <a
          href={buildWhatsAppLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn3d"
          style={{ background: "oklch(52% 0.15 145)", boxShadow: "0 4px 0 oklch(42% 0.13 145)" }}
        >
          {t.whatsappConfirm.confirmBtn}
        </a>
      </div>
      <button className="btn3d btn3d--green" onClick={() => navigate("/solution")}>
        {t.whatsappConfirm.continueBtn}
      </button>
    </div>
  );
}
