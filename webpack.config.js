const path = require("path");
const fs = require("fs");

const scenariosDir = path.join(__dirname, "scenarios");

// Get a list of all .js files in the scenarios folder
const scenarioFiles = fs
  .readdirSync(scenariosDir)
  .filter((file) => file.endsWith(".js"));

// Generate an entry and output configuration for each scenario file for Node.js
const nodeWebpackConfigurations = scenarioFiles.map((file) => ({
  entry: path.join(scenariosDir, file),
  output: {
    filename: file.replace(".js", ".bundle.js"),
    path: path.resolve(__dirname, "build/node"),
  },
  target: "node",
  mode: "production",
}));

// Generate an entry and output configuration for each scenario file for the web
const webWebpackConfigurations = scenarioFiles.map((file) => ({
  entry: path.join(scenariosDir, file),
  output: {
    filename: file.replace(".js", ".web.bundle.js"),
    path: path.resolve(__dirname, "build/web"),
  },
  target: "web",
  mode: "production",
}));

module.exports = [...nodeWebpackConfigurations, ...webWebpackConfigurations];
