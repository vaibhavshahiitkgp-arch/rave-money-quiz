import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LANGUAGE } from "../data/languages";
import { getQuestions } from "../data/index";

const STORAGE_KEY = "rave-money-quiz-state-v1";

function generateSessionId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// A fresh sessionId per call — identifies one quiz attempt, so a later
// "unlock" submission can be matched back to the earlier anonymous
// score-log row and update it in place instead of creating a duplicate.
function createInitialState() {
  return {
    language: DEFAULT_LANGUAGE,
    answers: {}, // { [questionId]: optionIndex }
    submitted: false,
    contact: null, // { name, whatsapp }
    detailedUnlocked: false,
    sessionId: generateSessionId(),
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();
    const parsed = JSON.parse(raw);
    return { ...createInitialState(), ...parsed };
  } catch {
    return createInitialState();
  }
}

const QuizContext = createContext(null);

export function QuizProvider({ children }) {
  const [state, setState] = useState(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const questions = useMemo(() => getQuestions(state.language), [state.language]);

  const setLanguage = useCallback((language) => {
    setState((s) => ({ ...s, language }));
  }, []);

  const setAnswer = useCallback((questionId, optionIndex) => {
    setState((s) => ({ ...s, answers: { ...s.answers, [questionId]: optionIndex } }));
  }, []);

  const score = useMemo(() => {
    if (!questions.length) return 0;
    return questions.reduce((total, q) => {
      return state.answers[q.id] === q.correctIndex ? total + 1 : total;
    }, 0);
  }, [questions, state.answers]);

  const unansweredIds = useMemo(
    () => questions.filter((q) => state.answers[q.id] === undefined).map((q) => q.id),
    [questions, state.answers]
  );

  const weakTopics = useMemo(
    () => [
      ...new Set(
        questions.filter((q) => state.answers[q.id] !== q.correctIndex).map((q) => q.topic)
      ),
    ],
    [questions, state.answers]
  );

  // Contact details (and the Sheet log) are captured via the SolutionGate
  // screen, which now runs before the score is ever shown — so submitting
  // the quiz itself just flips the local "submitted" flag.
  const submitQuiz = useCallback(() => {
    setState((s) => ({ ...s, submitted: true }));
  }, []);

  const unlockDetailed = useCallback((contact) => {
    setState((s) => ({ ...s, contact, detailedUnlocked: true }));
  }, []);

  const resetQuiz = useCallback(() => {
    setState((s) => ({ ...createInitialState(), language: s.language }));
  }, []);

  const value = {
    ...state,
    questions,
    score,
    total: questions.length,
    unansweredIds,
    weakTopics,
    setLanguage,
    setAnswer,
    submitQuiz,
    unlockDetailed,
    resetQuiz,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
}
