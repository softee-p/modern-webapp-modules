import React from 'react';
import { modelOptions } from '../utils/modelOptions';

export default function ModelSelector({ selectedModel, onSelectModel }) {
  return (
    <div className="mb-4">
      <label htmlFor="model" className="block text-sm font-medium text-gray-700">
        Model:
      </label>
      <select
        id="model"
        value={selectedModel}
        onChange={(e) => onSelectModel(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">Select a model</option>
        {modelOptions.map((model) => (
          <option key={model.url} value={model.url}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
}