// Define types for Option and Question
interface Option {
  text: string;
  isCorrect: boolean;
}

interface Question {
  question: string;
  options: Option[];
}

interface APIResponse {
  results: {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }[];
}

export const fetchQuestions = async (): Promise<Question[]> => {
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
    const data: APIResponse = await response.json();  // Specifying the API response type

    // Transform API data to match our Question and Option types
    const questions: Question[] = data.results.map((item) => {
      const options: Option[] = [
        ...item.incorrect_answers.map((answer) => ({
          text: answer,
          isCorrect: false,
        })),
        {
          text: item.correct_answer,
          isCorrect: true,
        },
      ];

      // Shuffle options for randomness
      options.sort(() => Math.random() - 0.5);

      return {
        question: item.question,
        options: options,
      };
    });

    return questions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};
