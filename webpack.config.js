const path = require("path");
const fs = require("fs");

const scenariosDir = path.join(__dirname, "scenarios"); // Folder containing our scenarios

// Get a list of all .js files in the scenarios folder
const scenarioFiles = fs
  .readdirSync(scenariosDir)
  .filter((file) => file.endsWith(".js"));

// Generate an entry and output configuration for each scenario file
const webpackConfigurations = scenarioFiles.map((file) => ({
  entry: path.join(scenariosDir, file),
  output: {
    filename: file.replace(".js", ".bundle.js"),
    path: path.resolve(__dirname, "build"),
  },
  target: "node",
  mode: "production",
}));

module.exports = webpackConfigurations;
