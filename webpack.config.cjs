const path = require("path");

module.exports = [
  {
    entry: "./runners/web-runner.js",
    output: {
      filename: "index.web.bundle.js",
      path: path.resolve(__dirname, "build"),
    },
    target: "web",
    mode: "production",
  },
  {
    entry: "./runners/node-runner.js",
    output: {
      filename: "index.node.bundle.js",
      path: path.resolve(__dirname, "build"),
    },
    target: "node",
    mode: "production",
  },
];
