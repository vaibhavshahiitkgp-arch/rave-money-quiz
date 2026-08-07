import { questionsEN } from "./questions.en";
import { questionsHI } from "./questions.hi";
import { questionsGU } from "./questions.gu";

export const QUESTIONS_BY_LANGUAGE = {
  en: questionsEN,
  hi: questionsHI,
  gu: questionsGU,
};

export function getQuestions(languageCode) {
  return QUESTIONS_BY_LANGUAGE[languageCode] ?? [];
}
