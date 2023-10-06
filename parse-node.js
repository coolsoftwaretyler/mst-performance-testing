const fs = require("fs");

// Read the file contents from ./results/hermes.txt
fs.readFile("./results/node.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  // Split the file contents into lines
  const lines = data.split("\n");

  // Initialize variables to store the current scenario and resource usage
  let currentScenario = "";
  let currentUserTime = 0.0;
  let currentMaxResident = 0;

  // Initialize an array to store the result
  const result = [];

  // Regular expression to match user time and max resident
  const resourceRegex = /(\d+\.\d+)user.*?(\d+)maxresident/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if the line contains a file path
    if (line.endsWith(".bundle.js")) {
      currentScenario = line.match(/(\S+)\.bundle\.js/)[1];
    } else {
      // Check if the line contains resource usage information
      const resourceMatch = line.match(resourceRegex);
      if (resourceMatch) {
        currentUserTime = parseFloat(resourceMatch[1]);
        currentMaxResident = parseInt(resourceMatch[2]);

        result.push({
          scenario: currentScenario,
          userTime: currentUserTime,
          maxResident: currentMaxResident,
        });
      }
    }
  }

  console.log(result);
});
