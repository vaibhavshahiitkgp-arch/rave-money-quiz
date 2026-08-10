import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mascot from "../components/Mascot";
import { useQuiz } from "../state/QuizContext";
import { getTier, mascotMouth } from "../data/tiers";
import { getStrings } from "../data/strings";
import { shareScore } from "../utils/share";
import { buildConfirmMessage, buildShareMessage, buildShareWhatsAppLink } from "../utils/whatsapp";

export default function Share() {
  const navigate = useNavigate();
  const { submitted, score, total, contact, language } = useQuiz();
  const t = getStrings(language);
  const [shareLabel, setShareLabel] = useState(t.share.shareBtn);

  useEffect(() => {
    if (!submitted) navigate("/", { replace: true });
  }, [submitted, navigate]);

  if (!submitted) return null;

  const tier = getTier(score, total);
  const shareText = buildShareMessage({ score, total, tierName: tier.name });
  const waText = buildConfirmMessage({ name: contact?.name || "-", score, total, tierName: tier.name });

  async function handleShare() {
    const result = await shareScore({ title: "The Money Money Quiz", text: shareText });
    if (result === "unsupported" && navigator.clipboard) {
      await navigator.clipboard.writeText(shareText);
      setShareLabel(t.share.copied);
      setTimeout(() => setShareLabel(t.share.shareBtn), 1800);
    }
  }

  return (
    <div className="card-shell blob-bg blob-bg--a" style={{ padding: "28px 24px", gap: 26, alignItems: "center", justifyContent: "space-between", minHeight: 560 }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
        <button className="back-link" onClick={() => navigate("/solution")}>
          {t.share.back}
        </button>
      </div>

      <div className="score-card">
        <div className="score-card__label">RAVE Finance Labs • Money Money Quiz</div>
        <Mascot size={70} mouth={mascotMouth(tier.name)} />
        <div className="score-card__tier">{tier.name}</div>
        <div className="score-card__score">{score}/{total}</div>
        <div className="score-card__challenge">{t.share.challenge}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: "100%" }}>
        <button className="btn3d btn3d--green" style={{ maxWidth: 280 }} onClick={handleShare}>
          {shareLabel}
        </button>
        <a href={buildShareWhatsAppLink(waText)} target="_blank" rel="noopener noreferrer" className="btn3d btn3d--outline" style={{ maxWidth: 280 }}>
          {t.share.shareWhatsapp}
        </a>
      </div>
    </div>
  );
}
