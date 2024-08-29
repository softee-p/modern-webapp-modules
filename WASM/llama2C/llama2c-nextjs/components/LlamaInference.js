import { useState, useEffect, useRef } from 'react';

export default function LlamaInference() {
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const workerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const toggleInference = () => {
    if (!isRunning) {
      setOutput('');
      workerRef.current = new Worker(new URL('../pages/api/worker.js', import.meta.url));
      workerRef.current.postMessage({});
      workerRef.current.onmessage = (event) => {
        const { data } = event.data;
        setOutput(prev => prev + data);
      };
      setIsRunning(true);
    } else {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
      setIsRunning(false);
    }
  };

  return (
    <div>
      <button onClick={toggleInference}>
        {isRunning ? 'Stop inference' : 'Run inference'}
      </button>
      <pre id="output">{output}</pre>
    </div>
  );
}