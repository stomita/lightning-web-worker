({
  scriptLoaded: false,

  containerLoaded: false,

  declareWorker: function (cmp) {
    var id = 0;
    window._ltngWebWorkers = {};
    var container = cmp.find("lightning-container");
    var Worker = function (url, options) {
      var instanceId = String(++id);
      this.instanceId = instanceId;
      this.url = url;
      this.options = options;
      this.requestQueue = [];
      this.client = null;
      // if the worker client script is already loaded
      if (window.LightningWebWorkerClient) {
        this.client = LightningWebWorkerClient.create(this, container);
      }
      window._ltngWebWorkers[instanceId] = this;
    };
    Worker.prototype.postMessage = function () {
      if (this.client) {
        this.client.postMessage.apply(this.client, arguments);
      } else {
        this.requestQueue.push(["postMessage", arguments]);
      }
    };
    Worker.prototype.addEventListener = function () {
      if (this.client) {
        this.client.addEventListener.apply(this.client, arguments);
      } else {
        this.requestQueue.push(["addEventListener", arguments]);
      }
    };
    return Worker;
  },

  initWorker: function (cmp) {
    if (!window.LightningWebWorkerClient) {
      console.error("load error: LightningWebWorkerClient is not found");
      return;
    }
    var container = cmp.find("lightning-container");
    container.message({ name: "worker:init", value: Date.now().toString() });
    for (var instanceId in window._ltngWebWorkers) {
      var instance = window._ltngWebWorkers[instanceId];
      if (!instance.client) {
        instance.client = LightningWebWorkerClient.create(instance, container);
      }
    }
  },

  dispatchWorkerMessage: function (cmp, message) {
    if (!window.LightningWebWorkerClient) {
      console.error("load error: LightningWebWorkerClient is not found");
      return;
    }
    const instanceId = message.instanceId;
    var instance = window._ltngWebWorkers[instanceId];
    var e = new MessageEvent(message.type, {
      data: message.data,
      origin: "",
    });
    instance.client.receiveEvent(e);
  },
});
