import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Brand from "../components/Brand";
import { useQuiz } from "../state/QuizContext";
import { getTier } from "../data/tiers";
import { shareScore } from "../utils/share";
import { buildShareEmailLink, buildShareWhatsAppLink } from "../utils/whatsapp";

const QUIZ_URL = typeof window !== "undefined" ? window.location.origin : "";

export default function Share() {
  const navigate = useNavigate();
  const { submitted, score, total } = useQuiz();
  const [nativeUnsupported, setNativeUnsupported] = useState(false);

  useEffect(() => {
    if (!submitted) navigate("/", { replace: true });
  }, [submitted, navigate]);

  if (!submitted) return null;

  const tier = getTier(score, total);
  const text = `I scored ${score}/${total} on RAVE Finance Labs' Money Money Quiz — ${tier.name}. Think you'd do better?`;

  async function handleNativeShare() {
    const result = await shareScore({ title: "Money Money Quiz", text, url: QUIZ_URL });
    if (result === "unsupported") setNativeUnsupported(true);
  }

  return (
    <div className="screen center">
      <Brand />
      <div className="card">
        <div className="score-big">
          {score}/{total}
        </div>
        <div className="tier-name">{tier.name}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <button className="btn btn--primary" onClick={handleNativeShare}>
          Share
        </button>
        {nativeUnsupported && (
          <>
            <a className="btn btn--secondary" href={buildShareWhatsAppLink(`${text} ${QUIZ_URL}`)} target="_blank" rel="noopener noreferrer">
              Share on WhatsApp
            </a>
            <a
              className="btn btn--ghost"
              href={buildShareEmailLink({ subject: "My Money Money Quiz score", body: `${text}\n\n${QUIZ_URL}` })}
            >
              Share via Email
            </a>
          </>
        )}
      </div>

      <div style={{ marginTop: "auto" }}>
        <button className="btn btn--ghost" onClick={() => navigate("/score")}>
          Back to score
        </button>
      </div>
    </div>
  );
}
