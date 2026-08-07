import { useNavigate } from "react-router-dom";
import Brand from "../components/Brand";
import { LANGUAGES } from "../data/languages";
import { useQuiz } from "../state/QuizContext";

export default function Landing() {
  const navigate = useNavigate();
  const { language, setLanguage } = useQuiz();

  return (
    <div className="screen center">
      <Brand />

      <div style={{ marginTop: 12 }}>
        <h1>The Money Money Quiz!!</h1>
        <p>
          How well do you really know the things every adult should already understand about
          their own money? Let&apos;s find out.
        </p>
      </div>

      <div className="card">
        <label style={{ marginBottom: 10 }}>Choose your language</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              className={`btn ${language === lang.code ? "btn--primary" : "btn--secondary"}`}
              onClick={() => setLanguage(lang.code)}
              disabled={!lang.available}
            >
              {lang.label}
              {!lang.available && " (coming soon)"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "auto" }}>
        <button className="btn btn--primary" onClick={() => navigate("/instructions")}>
          Start
        </button>
      </div>
    </div>
  );
}
