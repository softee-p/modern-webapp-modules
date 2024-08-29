import { action } from "./actions.js";

class LlamaCpp {
    constructor(url, init_callback, write_result_callback, on_complete_callback) {
        this.url = url;
        this.init_callback = init_callback;
        this.write_result_callback = write_result_callback;
        this.on_complete_callback = on_complete_callback;
        this.loadWorker();
    }


    loadWorker() {
        this.worker = new Worker(
            new URL('/main-worker.js', window.location.origin),
            {type: "module"}
        );

        this.worker.onmessage = (event) => {
            switch (event.data.event) {
                case action.INITIALIZED:
                    if (this.init_callback) {
                        this.init_callback();
                    }
                    break;
                case action.WRITE_RESULT:
                    if (this.write_result_callback) {
                        this.write_result_callback(event.data.text);
                    }
                    break;
                case action.RUN_COMPLETED:
                    if (this.on_complete_callback) {
                        this.on_complete_callback();
                    }
                    break;
            }
        };

        this.worker.postMessage({
            event: 0,
            url: this.url,
        });
    }

    run({
        prompt,
        chatml=false,
        n_predict=-2,
        ctx_size=2048,
        batch_size=512,
        temp=0.8,
        n_gpu_layers=0,
        top_k=40,
        top_p=0.9,
        no_display_prompt=true,
    }={}) {
        this.worker.postMessage({
            event: action.RUN_MAIN,
            prompt,
            chatml,
            n_predict,
            ctx_size,
            batch_size,
            temp,
            n_gpu_layers,
            top_k,
            top_p,
            no_display_prompt,
        });
    }
}

export { LlamaCpp };