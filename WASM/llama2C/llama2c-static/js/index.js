let worker;
let running = false;
let button = document.getElementById("toggle-inference");

button.addEventListener("click", () => {
    const output = document.getElementById("output");

    if (!running) {
        output.textContent = "";

        worker = new Worker("/worker.js", { type: "module" });
        worker.postMessage({});
        worker.addEventListener('message', function (event) {
            const { data } = event.data;
            output.textContent += data;
        });

        worker.addEventListener("error", function (error) {
            console.log("ERROR: ", error);
        });

        button.textContent = "Stop inference";
        running = true;
    } else {
        if (worker != null) {
            worker.terminate();
            worker = null;
        }

        button.textContent = "Run inference";
        running = false;
    }
});