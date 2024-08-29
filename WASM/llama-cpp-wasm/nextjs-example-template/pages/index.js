import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import ModelSelector from '../components/ModelSelector';
import PromptInput from '../components/PromptInput';
import ResultOutput from '../components/ResultOutput';
import RunButton from '../components/RunButton';
import { LlamaCpp } from '../utils/llama';

export default function Home() {
  const [selectedModel, setSelectedModel] = useState('');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  const appRef = useRef(null);

  useEffect(() => {
    // Clean up worker on unmount
    return () => {
      if (appRef.current && appRef.current.worker) {
        appRef.current.worker.terminate();
      }
    };
  }, []);

  const onModelLoaded = () => {
    setLoadingStage('Model loaded');
    setIsLoading(false);
    
    appRef.current.run({
      prompt: prompt,
      ctx_size: 2048,
      temp: 0.8,
      top_k: 40,
      no_display_prompt: true,
    });
  };

  const onMessageChunk = (text) => {
    setResult(prev => prev + text);
  };

  const onComplete = () => {
    setIsLoading(false);
    setLoadingStage('');
  };

  const handleRun = () => {
    if (!selectedModel || !prompt) return;

    setIsLoading(true);
    setLoadingStage('Loading model');
    setResult('');

    if (appRef.current && appRef.current.url === selectedModel) {
      onModelLoaded();
      return;
    }

    appRef.current = new LlamaCpp(
      selectedModel,
      onModelLoaded,          
      onMessageChunk,       
      onComplete,
    );
  };

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>llama-cpp-wasm</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-20">
        <h1 className="text-4xl font-bold mb-8">llama-cpp-wasm</h1>
        
        <ModelSelector 
          selectedModel={selectedModel} 
          onSelectModel={setSelectedModel} 
        />
        
        <PromptInput 
          prompt={prompt} 
          onPromptChange={setPrompt} 
        />
        
        <RunButton 
          onClick={handleRun} 
          isLoading={isLoading} 
          loadingStage={loadingStage} 
        />
        
        <ResultOutput result={result} />
      </main>
    </div>
  );
}