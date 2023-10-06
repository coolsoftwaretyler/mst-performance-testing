const fs = require("fs");

// Read the file at ./results/web.txt
fs.readFile("./results/web.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Split the file content into lines
  const lines = data.split("\n");

  const resultArray = [];

  // Loop through the lines to parse and format the data
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if the line contains relevant data
    if (line.startsWith("Bundle:")) {
      const scenarioLine = line.trim().substring("Bundle:".length).trim();
      const executionLine = lines[i + 1];
      const maxMemoryLine = lines[i + 2];

      // Extract scenario name
      let scenario = scenarioLine.split(" ")[0];
      // Remove .web.bundle.js from the suffix of the scenario name
      scenario = scenario.replace(".web.bundle.js", "");

      // Extract userTime and maxResident values
      let userTime = parseFloat(
        executionLine.split("Execution Time: ")[1].replace("ms", "")
      );
      // Make userTime in seconds, right now it's ms
      userTime /= 1000;
      const maxResident = parseFloat(
        maxMemoryLine.split("Max Memory Usage: ")[1].split(" KB")[0]
      );

      // Push the extracted data into the result array
      resultArray.push({
        scenario,
        time: userTime,
        memory: maxResident,
      });
    }
  }

  // Print the formatted array
  console.log(resultArray);
});
