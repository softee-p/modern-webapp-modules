import { InferenceParams, Model } from './utils/types';

export const WLLAMA_CONFIG_PATHS = {
  'single-thread/wllama.js': '/wllama/single-thread/wllama.js',
  'single-thread/wllama.wasm': '/wllama/single-thread/wllama.wasm',
  'multi-thread/wllama.js': '/wllama/multi-thread/wllama.js',
  'multi-thread/wllama.wasm': '/wllama/multi-thread/wllama.wasm',
  'multi-thread/wllama.worker.mjs': '/wllama/multi-thread/wllama.worker.mjs',
};

export const MAX_GGUF_SIZE = 2 * 1024 * 1024 * 1024; // 2GB

export const LIST_MODELS: Model[] = [
  {
    url: 'https://huggingface.co/HuggingFaceTB/smollm-360M-instruct-v0.2-Q8_0-GGUF/resolve/main/smollm-360m-instruct-add-basics-q8_0.gguf',
    size: 386405440,
  },
  // ... (other models)
];

export const DEFAULT_INFERENCE_PARAMS: InferenceParams = {
  nThreads: -1, // auto
  nContext: 4096,
  nPredict: 4096,
  nBatch: 128,
  temperature: 0.2,
};

export const DEFAULT_CHAT_TEMPLATE =
  "{% for message in messages %}{{'<|im_start|>' + message['role'] + '\n' + message['content'] + '<|im_end|>' + '\n'}}{% endfor %}{% if add_generation_prompt %}{{ '<|im_start|>assistant\n' }}{% endif %}";