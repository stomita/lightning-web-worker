const config = require("./webpack.config");

module.exports = Object.assign({}, config, {
  entry: {
    worker: "./src/example/worker.ts",
  },
  output: {
    path:
      __dirname + "/force-app/example/default/staticresources/MyWebWorkerProxy",
    filename: "[name].js",
  },
});
