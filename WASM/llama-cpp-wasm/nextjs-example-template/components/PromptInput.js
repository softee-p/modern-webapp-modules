import React from 'react';

export default function PromptInput({ prompt, onPromptChange }) {
  return (
    <div className="mb-4">
      <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
        Prompt:
      </label>
      <textarea
        id="prompt"
        rows="4"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Enter your prompt here..."
      />
    </div>
  );
}