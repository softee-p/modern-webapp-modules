import React from 'react';

export default function RunButton({ onClick, isLoading, loadingStage }) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isLoading ? `${loadingStage}...` : 'Run'}
    </button>
  );
}