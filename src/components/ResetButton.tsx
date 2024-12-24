import React from 'react';

interface ResetButtonProps {
  onClick: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onClick }) => (
  <button 
    onClick={onClick} 
    className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
    Reset Quiz
  </button>
);

export default ResetButton;
