export const getButtonStyle = (
  option: string,
  answerUser: string | null,
  isSubmitted: boolean,
  correctAnswer: string
): string => {
  if (!isSubmitted) {
    return answerUser === option
      ? "ring-3 ring-purple-600"
      : "hover:ring-3 hover:ring-purple-600";
  }
  if (option === correctAnswer) return "ring-3 ring-green-500";
  if (option === answerUser) return "ring-3 ring-red-500";
  return "";
};

export const getLetterStyle = (
  option: string,
  answerUser: string | null,
  isSubmitted: boolean,
  correctAnswer: string
): string => {
  if (!isSubmitted) {
    return answerUser === option
      ? "bg-purple-600 text-white"
      : "bg-grey-50 text-grey-500";
  }
  if (option === correctAnswer) return "bg-green-500 text-white";
  if (option === answerUser) return "bg-red-500 text-white";
  return "bg-grey-50 text-grey-500";
};