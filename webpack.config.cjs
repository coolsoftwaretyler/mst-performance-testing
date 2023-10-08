const path = require("path");

module.exports = {
  entry: "./runners/web-runner.js",
  output: {
    filename: "index.bundle.js",
    path: path.resolve(__dirname, "puppeteer"),
  },
  target: "web",
  mode: "production",
};
