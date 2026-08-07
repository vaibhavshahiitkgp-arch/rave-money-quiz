import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Brand from "../components/Brand";
import { useQuiz } from "../state/QuizContext";
import { getTier } from "../data/tiers";
import { isValidIndianMobile, isValidName, normalizeIndianMobile } from "../utils/validate";
import { buildLeadMessage, buildWhatsAppLink } from "../utils/whatsapp";
import { submitLead } from "../utils/api";

export default function SolutionGate() {
  const navigate = useNavigate();
  const { submitted, questions, answers, score, total, language, unlockDetailed } = useQuiz();
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!submitted) navigate("/", { replace: true });
  }, [submitted, navigate]);

  const nameValid = isValidName(name);
  const phoneValid = isValidIndianMobile(whatsapp);

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!nameValid || !phoneValid) return;

    const tier = getTier(score, total);
    const weakTopics = [
      ...new Set(
        questions.filter((q) => answers[q.id] !== q.correctIndex).map((q) => q.topic)
      ),
    ];
    const contact = { name: name.trim(), whatsapp: normalizeIndianMobile(whatsapp) };

    submitLead({
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

    const message = buildLeadMessage({ name: contact.name, score, total, tierName: tier.name, weakTopics });
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");

    navigate("/solution");
  }

  return (
    <div className="screen">
      <Brand />
      <h2>Get your detailed solution</h2>
      <p>
        See what you got right, what to review, and a short explanation for every question —
        share your name and WhatsApp number and we&apos;ll send it your way.
      </p>

      <form className="card" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          {touched && !nameValid && <div className="error-text">Please enter your name.</div>}
        </div>
        <div className="field">
          <label htmlFor="whatsapp">WhatsApp number</label>
          <input
            id="whatsapp"
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="10-digit mobile number"
          />
          {touched && !phoneValid && <div className="error-text">Please enter a valid Indian mobile number.</div>}
        </div>
        <button className="btn btn--primary" type="submit">
          Get my detailed solution
        </button>
      </form>

      <button className="btn btn--ghost" onClick={() => navigate("/score")}>
        Back to score
      </button>
    </div>
  );
}
