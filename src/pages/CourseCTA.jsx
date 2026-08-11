import { useNavigate } from "react-router-dom";
import { useQuiz } from "../state/QuizContext";
import { getStrings } from "../data/strings";
import { joinTopicsWithAnd } from "../data/topics";
import { RAVE_EMAIL, buildCourseEnquiryMessage, buildWhatsAppLink } from "../utils/whatsapp";
import { submitLead } from "../utils/api";

export default function CourseCTA() {
  const navigate = useNavigate();
  const { language, weakTopics, score, total, contact, sessionId, submitted } = useQuiz();
  const t = getStrings(language);

  const topTopics = weakTopics.slice(0, 3);
  const topicsJoined = joinTopicsWithAnd(topTopics, language);
  const intro = topTopics.length > 0 ? t.course.personalizedWithTopics(topicsJoined) : t.course.personalizedPerfect;

  const enquiryMessage = buildCourseEnquiryMessage({
    name: contact?.name || "",
    score: submitted ? score : undefined,
    total,
    weakTopicsJoined: topicsJoined,
  });

  function trackInterest(channel) {
    if (!sessionId) return;
    submitLead({ sessionId, courseInterest: channel });
  }

  return (
    <div className="card-shell blob-bg blob-bg--b" style={{ padding: "30px 26px", gap: 28 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <button className="back-link" onClick={() => navigate(-1)}>
          {t.course.back}
        </button>
        <div style={{ fontFamily: "var(--font-heading)", fontSize: 19, fontWeight: 700, color: "var(--ink)", lineHeight: 1.4 }}>
          {t.course.title}
        </div>
        <div style={{ fontSize: 14, color: "var(--ink)", fontWeight: 700 }}>{t.course.subtitle}</div>
        <div style={{ background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,.05)", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>Investing as a Life Skill</div>
          <div style={{ fontSize: 12.5, color: "var(--muted-soft)" }}>{t.course.courseDesc}</div>
          <div style={{ fontSize: 13, color: "var(--terracotta-shadow)", fontWeight: 700, lineHeight: 1.5 }}>{intro}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
            {t.course.bullets.map((b, i) => (
              <div key={i} style={{ fontSize: 13, color: "oklch(35% 0.02 260)" }}>
                • {b}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <a
          href={buildWhatsAppLink(enquiryMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn3d"
          style={{ background: "oklch(52% 0.15 145)", boxShadow: "0 4px 0 oklch(42% 0.13 145)" }}
          onClick={() => trackInterest("whatsapp")}
        >
          {t.course.enquireWhatsapp}
        </a>
        <a
          href={`mailto:${RAVE_EMAIL}?subject=Investing%20as%20a%20Life%20Skill&body=${encodeURIComponent(enquiryMessage)}`}
          className="btn3d btn3d--outline"
          onClick={() => trackInterest("email")}
        >
          {t.course.enquireEmail}
        </a>
      </div>
    </div>
  );
}
