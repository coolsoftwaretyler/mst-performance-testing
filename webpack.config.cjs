const path = require("path");

module.exports = [
  {
    entry: "./runner.js",
    output: {
      filename: "index.web.bundle.js",
      path: path.resolve(__dirname, "build"),
    },
    target: "web",
    mode: "production",
  },
  {
    entry: "./runner.js",
    output: {
      filename: "index.node.bundle.js",
      path: path.resolve(__dirname, "build"),
    },
    target: "node",
    mode: "production",
  },
];
