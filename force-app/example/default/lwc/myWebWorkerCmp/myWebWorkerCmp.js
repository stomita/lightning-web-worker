import { LightningElement } from "lwc";

export default class MyWebWorkerCmp extends LightningElement {
  worker = null;
  requestText = "";
  responseText = "";

  onChangeText(e) {
    console.log(e);
    this.requestText = e.target.value;
  }

  handleClick() {
    if (!this.worker) {
      console.log("creating worker...");
      this.worker = new Worker("./worker.js");
      this.worker.postMessage(this.requestText);
      this.worker.onmessage = (e) => {
        console.log("worker onmessage", e);
        this.responseText = e.data;
        this.worker = null;
      };
    }
  }
}
