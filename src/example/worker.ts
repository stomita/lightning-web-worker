async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

self.addEventListener("message", async (e) => {
  console.log("message arrived to web worker", e);
  await delay(1000);
  self.postMessage(e.data);
});
