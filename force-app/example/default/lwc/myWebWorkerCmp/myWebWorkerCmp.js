import { LightningElement } from "lwc";

function veryVeryHeavyCalculation(num, callback) {
  let sum = 0;
  setTimeout(() => {
    for (let i = 0; i < num; i++) {
      for (let j = 0; j < num; j++) {
        for (let k = 0; k < num; k++) {
          sum += i + j + k;
        }
      }
    }
    callback(sum);
  }, 100);
}

export default class MyWebWorkerCmp extends LightningElement {
  calculating = false;
  input = 500;
  output = null;

  onChangeInput(e) {
    console.log(e);
    this.input = e.target.value;
  }

  get calculationDisabled() {
    const input = Number(this.input);
    return this.calculating || Number.isNaN(input) || input < 0 || input > 1000;
  }

  startCalc() {
    this.calculating = true;
    this.output = null;
    const input = Number(this.input);
    veryVeryHeavyCalculation(input, (output) => {
      this.output = output;
      this.calculating = false;
    });
  }

  startCalcInWorker() {
    console.log("creating worker...");
    this.calculating = true;
    this.output = null;
    const worker = new Worker("./worker.js");
    const input = Number(this.input);
    worker.postMessage(input);
    worker.onmessage = (e) => {
      console.log("worker onmessage", e);
      this.output = e.data;
      this.calculating = false;
    };
  }
}
