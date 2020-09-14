({
  workers: {},

  scriptLoaded: false,

  containerLoaded: false,

  declareWorker: function (cmp) {
    var id = 0;
    var helper = this;
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
      helper.workers[instanceId] = this;
    };
    [
      "postMessage",
      "addEventListener",
      "removeEventListener",
      "terminate",
    ].forEach(function (method) {
      Worker.prototype[method] = function () {
        if (this.client) {
          this.client[method].apply(this.client, arguments);
        } else {
          this.requestQueue.push([method, arguments]);
        }
        if (method === "terminate") {
          delete helper.workers[this.instanceId];
        }
      };
    });
    return Worker;
  },

  initWorker: function (cmp) {
    if (!window.LightningWebWorkerClient) {
      console.error("load error: LightningWebWorkerClient is not found");
      return;
    }
    var container = cmp.find("lightning-container");
    container.message({ name: "worker:init", value: Date.now().toString() });
    for (var instanceId in helper.workers) {
      var instance = helper.workers[instanceId];
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
    var instance = this.workers[message.instanceId];
    if (!instance) {
      console.warn("the worker instance is not found or already terminated");
      return;
    }
    var e = new MessageEvent(message.type, {
      data: message.data,
      origin: "",
    });
    instance.client.receiveEvent(e);
  },
});
