import { useState } from "react";
import type { Quiz } from "../types"


interface QuizScreenProps {
  activeQuiz: Quiz | null;
}

const QuizScreen = ({ activeQuiz }: QuizScreenProps) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerUser, setAnswerUser] = useState('');

  return (
    <section className="flex flex-col gap-10 desktop:flex-row desktop:gap-32">
      <div className="w-full flex flex-col gap-4 desktop:gap-12 desktop:max-w-116.25  desktop:pb-4">
        {activeQuiz?.questions.map(q => <p key={q.question} className="text-blue-900">{q.question}</p>)}
        <h1>as</h1>
      </div>
      <div></div>
    </section>
  )
}

export default QuizScreen