({
  init: function (cmp, evt, helper) {
    if (typeof window.Worker === "undefined") {
      window.Worker = helper.declareWorker(cmp);
    }
  },
  initScript: function (cmp, evt, helper) {
    helper.scriptLoaded = true;
    if (helper.containerLoaded) {
      helper.initWorker(cmp);
    }
  },
  handleMessage: function (cmp, evt, helper) {
    var payload = evt.getParams().payload;
    if (payload.name === "server:ready" && !helper.containerLoaded) {
      helper.containerLoaded = true;
      if (helper.scriptLoaded) {
        helper.initWorker(cmp);
      }
    } else if (payload.name === "server:message") {
      helper.dispatchWorkerMessage(cmp, payload.value);
    }
  },
  handleError: function () {
    console.log("handleError", arguments);
  },
});
