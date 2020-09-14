import { LightningElement } from "lwc";

export default class MyAnimationBar extends LightningElement {
  barStart = 0;
  barSize = 50;

  get barStyle() {
    return `left: ${this.barStart}%; width: ${this.barSize}%;`;
  }

  connectedCallback() {
    const updateBar = () => {
      this.barStart = (this.barStart + 1) % 100;
      this.barSize = (this.barSize + 2) % 80;
      requestAnimationFrame(updateBar);
    };
    requestAnimationFrame(updateBar);
  }
}
