module.exports = {
  entry: {
    server: "./src/server.ts",
    client: "./src/client.ts",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  node: true,
                },
              },
            ],
            "@babel/preset-typescript",
          ],
        },
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "source-map",
};
