import React from 'react';

export default function ResultOutput({ result }) {
  return (
    <div className="mt-4">
      <label htmlFor="result" className="block text-sm font-medium text-gray-700">
        Result:
      </label>
      <div
        id="result"
        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 min-h-[100px]"
      >
        {result}
      </div>
    </div>
  );
}