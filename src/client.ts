import {
  MSG_WORKER_NEW,
  MSG_WORKER_POST_MESSAGE,
  MSG_WORKER_ADD_EVENT_LISTENER,
  MSG_WORKER_REMOVE_EVENT_LISTENER,
  MSG_WORKER_TERMINATE,
} from "./constant";

/**
 *
 */
type WorkerProxy = {
  instanceId: string;
  url: string;
  options: WorkerOptions | undefined;
  requestQueue: Array<[string, any[]]>;
  onmessage?: (e: MessageEvent) => void;
  client: LightningWebWorkerClient;
};

/**
 *
 */
class LightningWebWorkerClient {
  /**
   *
   * @param container
   * @param instanceId
   * @param instance
   */
  static create(
    instance: WorkerProxy,
    container: any
  ): LightningWebWorkerClient {
    const client = new LightningWebWorkerClient(
      container,
      instance.instanceId,
      instance.url,
      instance.options
    );
    for (const req of instance.requestQueue) {
      const method = req[0];
      const args = req[1];
      try {
        (client as any)[method].apply(client, args);
      } catch (err) {
        console.error(err);
      }
    }
    client.addEventListener("message", (e) => {
      if (instance.onmessage) {
        instance.onmessage(e);
      }
    });
    return client;
  }

  /**
   *
   */
  container: any;
  instanceId: string;
  options: WorkerOptions | undefined;
  listeners: Array<(e: MessageEvent) => void>;

  /**
   *
   * @param container
   * @param instanceId
   * @param path
   * @param options
   */
  constructor(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    container: any,
    instanceId: string,
    url: string,
    options?: WorkerOptions
  ) {
    this.container = container;
    this.instanceId = instanceId;
    this.listeners = [];
    this.container.message({
      name: MSG_WORKER_NEW,
      value: { instanceId, url, options },
    });
  }

  postMessage(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    message: any
  ): void {
    this.container.message({
      name: MSG_WORKER_POST_MESSAGE,
      value: { instanceId: this.instanceId, message },
    });
  }

  addEventListener(type: string, listener: (e: MessageEvent) => void): void {
    if (this.listeners.length === 0) {
      this.container.message({
        name: MSG_WORKER_ADD_EVENT_LISTENER,
        value: { instanceId: this.instanceId },
      });
    }
    this.listeners.push(listener);
  }

  removeEventListener(type: string, listener: (e: MessageEvent) => void): void {
    this.listeners = this.listeners.filter((l) => l !== listener);
    if (this.listeners.length === 0) {
      this.container.message({
        name: MSG_WORKER_REMOVE_EVENT_LISTENER,
        value: { instanceId: this.instanceId },
      });
    }
  }

  terminate(): void {
    this.container.message({
      name: MSG_WORKER_TERMINATE,
      value: { instanceId: this.instanceId },
    });
  }

  receiveEvent(evt: MessageEvent): void {
    this.listeners.forEach(function (listener) {
      listener.call(null, evt);
    });
  }
}

(window as any).LightningWebWorkerClient = LightningWebWorkerClient;
