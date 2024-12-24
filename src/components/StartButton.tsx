import React from 'react';

interface StartButtonProps {
  onClick: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ onClick }) => (
  <button 
    onClick={onClick} 
    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    Start Quiz
  </button>
);

export default StartButton;
