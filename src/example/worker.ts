function veryVeryHeavyCalculation(num: number) {
  let sum = 0;
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      for (let k = 0; k < num; k++) {
        sum += i + j + k;
      }
    }
  }
  return sum;
}

self.addEventListener("message", async (e) => {
  console.log("message arrived to web worker", e);
  const num: number = e.data;
  const sum = veryVeryHeavyCalculation(num);
  console.log("message is sent back to client", sum);
  self.postMessage(sum);
});
