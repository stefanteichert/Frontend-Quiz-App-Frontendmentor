import { useState } from "react";
import type { Quiz } from "../types";

export const useQuiz = (
  activeQuiz: Quiz,
  onScoreUpdate: () => void,
  onFinish: () => void
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerUser, setAnswerUser] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);

  const currentQuestion = activeQuiz.questions[currentIndex];
  const isLastQuestion = currentIndex === activeQuiz.questions.length - 1;
  const progress = (currentIndex / activeQuiz.questions.length) * 100;

  const handleAnswer = (option: string) => {
    if (isSubmitted) return;
    setAnswerUser(option);
    setShowError(false);
  };

  const handleSubmit = () => {
    if (answerUser === null) return setShowError(true);
    if (answerUser === currentQuestion.answer) onScoreUpdate();
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (isLastQuestion) return onFinish();
    setCurrentIndex((prev) => prev + 1);
    setAnswerUser(null);
    setIsSubmitted(false);
    setShowError(false);
  };

  return {
    currentQuestion,
    currentIndex,
    isLastQuestion,
    progress,
    answerUser,
    isSubmitted,
    showError,
    handleAnswer,
    handleSubmit,
    handleNext,
  };
};