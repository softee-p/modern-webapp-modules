import { WASI, WASIContext } from "@runno/wasi";

const wasiWorker = async () => {
  const [model, tokenizer] = await Promise.all([
    fetch("/model/model.bin").then(res => res.arrayBuffer()),
    fetch("/model/tokenizer.bin").then(res => res.arrayBuffer())
  ]);

  const context = new WASIContext({
    args: ["", "model.bin", "-t", "0.9"],
    stdout: (data) => self.postMessage({ data }),
    stderr: (err) => console.error("stderr", err),
    fs: {
      "/model.bin": {
        path: "/model.bin",
        timestamps: {
          access: new Date(),
          change: new Date(),
          modification: new Date(),
        },
        mode: "binary",
        content: new Uint8Array(model),
      },
      "/tokenizer.bin": {
        path: "/tokenizer.bin",
        timestamps: {
          access: new Date(),
          change: new Date(),
          modification: new Date(),
        },
        mode: "binary",
        content: new Uint8Array(tokenizer),
      },
    },
  });

  WASI.start(fetch("/llama2-c.wasm"), context);
};

self.addEventListener('message', wasiWorker);

export default () => {};