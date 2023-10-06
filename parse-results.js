const fs = require("fs");
const path = require("path");

// Define the directory where the files are located
const directory = "results";

// Define regular expressions for both formats
const regex1 =
  /Bundle: ([^\n]+)\nExecution Time: (\d+)ms\nMax Memory Usage: (\d+\.\d+) KB/gm;
const regex2 =
  /([^/]+)\.bundle\.js\s*[\d:.]+\s*.*?(\d+:\d+\.\d+)elapsed\s*.*?(\d+)maxresident/gm;
// Function to extract information using a regular expression
function extractInfo(text, regex) {
  const results = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    const scenario = path.basename(match[0]); // Extract the filename
    const time = parseFloat(match[1]);
    const memory = parseFloat(match[2]);
    results.push({ scenario, time, memory });
  }
  return results;
}

// Function to process a file and extract information
function processFile(filename) {
  const filePath = path.join(directory, filename);
  try {
    const rawText = fs.readFileSync(filePath, "utf8");
    const results1 = extractInfo(rawText, regex1);
    const results2 = extractInfo(rawText, regex2);
    return [...results1, ...results2];
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return [];
  }
}

// Process each file and print the results
const fileNames = ["hermes.txt", "node.txt", "web.txt"];
fileNames.forEach((fileName) => {
  const results = processFile(fileName);
  console.log(`Results for ${fileName}:`);
  results.forEach((result) => {
    console.log(result);
  });
});
