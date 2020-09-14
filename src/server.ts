import LCC from "lightning-container";
import {
  MSG_WORKER_SERVER_READY,
  MSG_WORKER_NEW,
  MSG_WORKER_POST_MESSAGE,
  MSG_WORKER_ADD_EVENT_LISTENER,
  MSG_WORKER_SERVER_MESSAGE_EVENT,
} from "./constant";

type NewWorkerPayload = {
  instanceId: string;
  url: string;
  options: WorkerOptions | undefined;
};

type PostMessagePayload = {
  instanceId: string;
  message: any;
};

function sendServerReady() {
  LCC.sendMessage({
    name: MSG_WORKER_SERVER_READY,
    value: Date.now().toString(),
  });
}

const workers: { [id: string]: Worker } = {};

function handleIncomingMessage(msg: any) {
  switch (msg.name) {
    case MSG_WORKER_NEW: {
      const { instanceId, url, options } = msg.value as NewWorkerPayload;
      const worker = new Worker(url, options);
      workers[instanceId] = worker;
      break;
    }
    case MSG_WORKER_POST_MESSAGE: {
      const { instanceId, message } = msg.value as PostMessagePayload;
      const worker = workers[instanceId];
      if (worker) {
        worker.postMessage(message);
      }
      break;
    }
    case MSG_WORKER_ADD_EVENT_LISTENER: {
      const { instanceId } = msg.value as PostMessagePayload;
      const worker = workers[instanceId];
      if (worker) {
        worker.addEventListener("message", (e) => {
          handleWorkerMessage(instanceId, e);
        });
      }
      break;
    }
    default:
      break;
  }
}

function handleWorkerMessage(instanceId: string, e: MessageEvent) {
  LCC.sendMessage({
    name: MSG_WORKER_SERVER_MESSAGE_EVENT,
    value: {
      instanceId,
      type: e.type,
      data: e.data,
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  let pid: number | undefined = setInterval(sendServerReady, 500);
  LCC.addMessageHandler((msg) => {
    if (pid) {
      clearInterval(pid);
      pid = undefined;
    }
    handleIncomingMessage(msg);
  });
  sendServerReady();
});
