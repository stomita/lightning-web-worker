import LCC from "lightning-container";
import {
  MSG_WORKER_SERVER_READY,
  MSG_WORKER_NEW,
  MSG_WORKER_POST_MESSAGE,
  MSG_WORKER_ADD_EVENT_LISTENER,
  MSG_WORKER_REMOVE_EVENT_LISTENER,
  MSG_WORKER_SERVER_MESSAGE_EVENT,
  MSG_WORKER_TERMINATE,
} from "./constant";

type WorkerCallPayload = {
  instanceId: string;
};

type NewWorkerPayload = WorkerCallPayload & {
  url: string;
  options: WorkerOptions | undefined;
};

type PostMessagePayload = WorkerCallPayload & {
  message: any;
};

function sendServerReady() {
  LCC.sendMessage({
    name: MSG_WORKER_SERVER_READY,
    value: Date.now().toString(),
  });
}

const workers: { [id: string]: Worker } = {};
const listeners: { [id: string]: (e: MessageEvent) => void } = {};

function handleIncomingMessage(msg: any) {
  switch (msg.name) {
    case MSG_WORKER_NEW: {
      const { instanceId, url, options } = msg.value as NewWorkerPayload;
      try {
        const worker = new Worker(url, options);
        workers[instanceId] = worker;
      } catch (e) {
        console.error(e);
      }
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
      const { instanceId } = msg.value as WorkerCallPayload;
      const worker = workers[instanceId];
      if (worker) {
        const listener = (e: MessageEvent) => {
          handleWorkerMessage(instanceId, e);
        };
        listeners[instanceId] = listener;
        worker.addEventListener("message", listener);
      }
      break;
    }
    case MSG_WORKER_REMOVE_EVENT_LISTENER: {
      const { instanceId } = msg.value as WorkerCallPayload;
      const worker = workers[instanceId];
      if (worker) {
        const listener = listeners[instanceId];
        if (listener) {
          worker.removeEventListener("message", listener);
          delete listeners[instanceId];
        }
      }
      break;
    }
    case MSG_WORKER_TERMINATE: {
      const { instanceId } = msg.value as WorkerCallPayload;
      const worker = workers[instanceId];
      if (worker) {
        worker.terminate();
        delete workers[instanceId];
        delete listeners[instanceId];
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
