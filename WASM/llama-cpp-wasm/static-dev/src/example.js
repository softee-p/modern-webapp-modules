import { LlamaCpp } from "./dist/llama.js";

let app;
const buttonRun = document.querySelector("#run");
const buttonRunProgressLoadingModel = document.querySelector("#run-progress-loading-model");
const buttonRunProgressLoadedModel = document.querySelector("#run-progress-loaded-model");
const buttonRunProgressGenerating = document.querySelector("#run-progress-generating");
const selectModel = document.querySelector("select#model");
const modelProgress = document.querySelector("#model-progress");
const textareaPrompt = document.querySelector("textarea#prompt");
const textareaResult = document.querySelector("#result");
const modelOptions = [
  {
    name: "Qwen/Qwen1.5-0.5B-Chat Q3_K_M (350 MB)",
    url: "https://huggingface.co/Qwen/Qwen1.5-0.5B-Chat-GGUF/resolve/main/qwen1_5-0_5b-chat-q3_k_m.gguf"
  },
  {
    name: "tinymistral-248m-sft-v4 q8_0 (265.26 MB)",
    url: "https://huggingface.co/afrideva/TinyMistral-248M-SFT-v4-GGUF/resolve/main/tinymistral-248m-sft-v4.q8_0.gguf"
  },
  {
    name: "TinyLlama/TinyLlama-1.1B-Chat-v1.0 Q4_K_M (669 MB)",
    url: "https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF/resolve/main/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf"
  },
  {
    name: "Qwen/Qwen1.5-1.8B-Chat Q3_K_M (1.02 GB)",
    url: "https://huggingface.co/Qwen/Qwen1.5-1.8B-Chat-GGUF/resolve/main/qwen1_5-1_8b-chat-q3_k_m.gguf"
  },
  {
    name: "stabilityai/stablelm-2-zephyr-1_6b Q4_1 (1.07 GB)",
    url: "https://huggingface.co/stabilityai/stablelm-2-zephyr-1_6b/resolve/main/stablelm-2-zephyr-1_6b-Q4_1.gguf"
  },
  {
    name: "microsoft/phi-1_5 Q4_K_M (918 MB)",
    url: "https://huggingface.co/TKDKid1000/phi-1_5-GGUF/resolve/main/phi-1_5-Q4_K_M.gguf"
  },
  {
    name: "microsoft/phi-2 Q3_K_M (1.48 GB)",
    url: "https://huggingface.co/TheBloke/phi-2-GGUF/resolve/main/phi-2.Q3_K_M.gguf"
  },
  {
    name: "microsoft/phi-3-mini-4k Q3_K_M (1.96 GB)",
    url: "https://huggingface.co/SanctumAI/Phi-3-mini-4k-instruct-GGUF/resolve/main/phi-3-mini-4k-instruct.Q3_K_M.gguf"
  },
  {
    name: "google/flan-t5-small Q3_K_M (88.3 MB)",
    url: "https://huggingface.co/Felladrin/gguf-flan-t5-small/resolve/main/flan-t5-small.Q3_K_M.gguf"
  }
];

modelOptions.forEach((model, index) => {
  const option = document.createElement('option');
  option.value = model.url;
  option.textContent = model.name;
  if (index === 0) option.selected = true;
  selectModel.appendChild(option);
});

const onModelLoaded = () => {
  const prompt = textareaPrompt.value;
  buttonRunProgressLoadingModel.setAttribute("hidden", "hidden");
  buttonRunProgressLoadedModel.removeAttribute("hidden");
  console.debug("model: loaded");

  app.run({
      prompt: prompt,
      ctx_size: 2048,
      temp: 0.8,
      top_k: 40,
      no_display_prompt: true,
  });
}

const onMessageChunk = (text) => {
  console.log(text);

  if (buttonRunProgressGenerating.hasAttribute("hidden")) {
    buttonRunProgressLoadingModel.setAttribute("hidden", "hidden");
    buttonRunProgressLoadedModel.setAttribute("hidden", "hidden");
    buttonRunProgressGenerating.removeAttribute("hidden");
  }

  // textareaResult.value += text;
  textareaResult.innerText += text;
};

const onComplete = () => {
  console.debug("model: completed");
  buttonRun.removeAttribute("hidden");
  buttonRunProgressLoadingModel.setAttribute("hidden", "hidden");
  buttonRunProgressLoadedModel.setAttribute("hidden", "hidden");
  buttonRunProgressGenerating.setAttribute("hidden", "hidden");
  modelProgress.setAttribute("hidden", "hidden");
};

buttonRun.addEventListener("click", (e) => {
  buttonRun.setAttribute("hidden", "hidden");
  buttonRunProgressLoadingModel.removeAttribute("hidden");
  modelProgress.removeAttribute("hidden");
  // textareaResult.value = "";
  textareaResult.innerText = "";

  if (app && app.url == selectModel.value) {
    onModelLoaded();
    return;
  }

  app = new LlamaCpp(
    selectModel.value,
    onModelLoaded,          
    onMessageChunk,       
    onComplete,
  );
});
