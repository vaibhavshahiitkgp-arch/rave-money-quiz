import { useNavigate } from "react-router-dom";
import Brand from "../components/Brand";
import { useQuiz } from "../state/QuizContext";
import { RAVE_EMAIL, buildShareEmailLink, buildWhatsAppLink } from "../utils/whatsapp";

// PLACEHOLDER curriculum detail — replace with RAVE Finance Labs' actual
// "Investing as a Life Skill" course copy (a fuller version exists in
// earlier project material and should be adapted here rather than
// rewritten from scratch).
const WEEKS = [
  "Money mindset & goal-setting",
  "Budgeting that actually sticks",
  "Emergency funds & safe liquidity",
  "Understanding credit & debt",
  "Insurance: what you actually need",
  "Tax basics for salaried & self-employed",
  "Introduction to equity markets",
  "Mutual funds & SIPs",
  "Fixed income: bonds & deposits",
  "Building a diversified portfolio",
  "Retirement planning",
  "Putting it all together: your financial plan",
];

export default function CourseCTA() {
  const navigate = useNavigate();
  const { resetQuiz } = useQuiz();

  function handleRetake() {
    resetQuiz();
    navigate("/");
  }

  const enquiryMessage = "Hi RAVE Finance Labs, I'd like to know more about the Investing as a Life Skill course.";

  return (
    <div className="screen">
      <Brand />
      <h2>Want to learn more about Investing and Finance?</h2>
      <p>Learn from an expert. RAVE Finance Labs' flagship course — Investing as a Life Skill — is a 12-week program built to take you from money-curious to money-confident.</p>

      <div className="card">
        <ol style={{ margin: 0, paddingLeft: 20, color: "var(--text)" }}>
          {WEEKS.map((w, i) => (
            <li key={i} style={{ marginBottom: 8 }}>
              {w}
            </li>
          ))}
        </ol>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <a
          className="btn btn--primary"
          href={buildWhatsAppLink(enquiryMessage)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Enquire on WhatsApp
        </a>
        <a
          className="btn btn--secondary"
          href={buildShareEmailLink({ subject: "Investing as a Life Skill — enquiry", body: enquiryMessage })}
        >
          Enquire via {RAVE_EMAIL}
        </a>
      </div>

      <div style={{ marginTop: "auto" }}>
        <button className="btn btn--ghost" onClick={handleRetake}>
          Retake the quiz
        </button>
      </div>
    </div>
  );
}
