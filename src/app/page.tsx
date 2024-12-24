"use client";

import { useState, useEffect } from 'react';
import StartButton from '@/components/StartButton';
import ResetButton from '@/components/ResetButton';
import LoadingSpinner from '@/components/LoadingSpinner';
import { fetchQuestions } from '@/utils/fetchQuestions';

interface Option {
  text: string;
  isCorrect: boolean;
}

interface Question {
  question: string;
  options: Option[];
}

const QuizPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const startQuiz = async () => {
    setLoading(true);
    const fetchedQuestions = await fetchQuestions();
    setQuestions(fetchedQuestions);
    setLoading(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  const handleAnswer = (isCorrect: boolean, index: number) => {
    setSelectedOption(index);

    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  useEffect(() => {
    if (showResult) {
      localStorage.setItem('quizScore', score.toString());
    }
  }, [showResult, score]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-bg bg-cover bg-left-bottom">
      <div className="p-6 max-w-lg w-full bg-white shadow-2xl rounded-xl text-gray-900">
        <h1 className="text-center text-3xl font-bold mb-6 text-teal-700">Quiz Game</h1>

        {loading ? (
          <LoadingSpinner />
        ) : !questions.length ? (
          <div className="flex justify-center">
            <StartButton onClick={startQuiz} />
          </div>
        ) : showResult ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Final Score: {score}/{questions.length}
            </h2>
            <p className="mb-6">Thanks for playing!</p>
            <ResetButton onClick={resetQuiz} />
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Question {currentQuestion + 1}: <span dangerouslySetInnerHTML={{ __html: questions[currentQuestion].question }} />
            </h3>
            <div className="space-y-3 mt-4">
              {questions[currentQuestion].options.map((option, index) => {
                let optionStyle = "bg-teal-500 hover:bg-teal-600 text-white";

                if (selectedOption !== null) {
                  if (index === selectedOption) {
                    optionStyle = option.isCorrect
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white";
                  } else if (option.isCorrect) {
                    optionStyle = "bg-green-500 text-white";
                  } else {
                    optionStyle = "bg-gray-300 text-gray-500";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.isCorrect, index)}
                    className={`w-full py-2 px-4 rounded shadow-md transition ${optionStyle}`}
                    disabled={selectedOption !== null}>
                    {option.text}
                  </button>
                );
              })}
            </div>
            <div className="text-center mt-4 text-lg font-semibold text-teal-700">
              Score: {score}/{questions.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;