const fs = require("fs");
const path = require("path");
const webpack = require("webpack");

function readPerfFiles(dirPath) {
  const files = fs.readdirSync(dirPath);
  const perfFiles = [];

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      perfFiles.push(...readPerfFiles(filePath));
    } else if (filePath.includes(".perf.md")) {
      perfFiles.push(filePath);
    }
  });

  return perfFiles;
}

function readPerfFile(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const metadata = {};
  let imports = "";
  let source = "";

  // Regular expression for the metadata block
  const metadataRegex = /---([\s\S]*?)---/;
  const metadataMatch = fileContent.match(metadataRegex);
  if (metadataMatch) {
    const metadataString = metadataMatch[1].trim();
    metadataString.split("\n").forEach((line) => {
      const [key, value] = line.split(":").map((str) => str.trim());
      metadata[key] = value;
    });
  }

  // Regular expression for the import statements block
  const importsRegex = /```js\n(import [\s\S]*?)\n```/;
  const importsMatch = fileContent.match(importsRegex);
  if (importsMatch) {
    imports = importsMatch[1].trim();
  }

  // Regular expression for the JavaScript code block
  const sourceRegex = /```js\n([\s\S]*?)\n```/g;
  let sourceMatch;
  while ((sourceMatch = sourceRegex.exec(fileContent)) !== null) {
    // This ensures that we don't capture the import block again
    if (!sourceMatch[1].startsWith("import ")) {
      source += sourceMatch[1].trim() + "\n";
    }
  }

  return { metadata, imports, source };
}

function createBundleSource(metadata, imports, source) {
  return `
${imports}
import Benchmark from "benchmark"; // This is technically a no-op in the web bundle, but included for cross-compatibility

var suite = new Benchmark.Suite();

/**
 * getStartMemory is an isomorphic way to get the memory used, in bytes,
 * either from the browser or from Node.
 */
const getStartMemory = () => {
  if (typeof performance.memory !== "undefined") {
    return performance.memory.usedJSHeapSize;
  } else {
    const used = process.memoryUsage();
    return used.heapUsed;
  }
};

/**
 * getEndMemory is an isomorphic way to get the memory used, in bytes,
 * either from the browser or from Node.
 */
const getEndMemory = () => {
  if (typeof performance.memory !== "undefined") {
    return performance.memory.usedJSHeapSize;
  } else {
    const used = process.memoryUsage();
    return used.heapUsed;
  }
};

/**
 * trackMaxMemory maintains a map of memory usage for each scenario.
 *
 * It uses keys that correspond to the title of each scenario, and the
 * value is the maximum memory used for that scenario.
 */
const memoryUsage = {};
const trackMaxMemory = (title, memoryUsed) => {
  if (!memoryUsage[title]) {
    memoryUsage[title] = memoryUsed;
  } else {
    memoryUsage[title] = Math.max(memoryUsage[title], memoryUsed);
  }
};

suite.on("complete", function () {
  const headers = [
    "scenario",
    "ops_per_sec",
    "margin_of_error",
    "runs",
    "max_memory_used_kb",
  ];
  const results = suite.filter("successful").map((benchmark) => {
    return {
      scenario: benchmark.name,
      opsSec: benchmark.hz,
      plusMinus: benchmark.stats.rme,
      runs: benchmark.stats.sample.length,
      maxMemory: memoryUsage[benchmark.name],
    };
  });

  console.log(headers.join(","));
  results.forEach((result) => {
    console.log(result.scenario + "," + result.opsSec + "," + result.plusMinus + "," + result.runs + "," + result.maxMemory);
  });
});

suite.add(${metadata.title}, () => {
  const startMemory = getStartMemory();
  ${source} 
  const endMemory = getEndMemory();
  const memoryUsed = endMemory - startMemory;
  trackMaxMemory(${metadata.title}, memoryUsed);
});

suite.on("cycle", function (event) {
  console.log(String(event.target));
});

suite.run();
`;
}

function goodFileName(str) {
  // Replace spaces with dashes
  let fileSafeStr = str.replace(/\s+/g, "-");

  // Convert to lowercase
  fileSafeStr = fileSafeStr.toLowerCase();

  // Remove special characters
  fileSafeStr = fileSafeStr.replace(/[^\w-]+/g, "");

  return fileSafeStr;
}

function bundleWithWebpack(entryPath, outputPath, platform) {
  return new Promise((resolve, reject) => {
    const config = {
      mode: "production",
      entry: entryPath,
      output: {
        filename: path.basename(outputPath),
        path: path.dirname(outputPath),
        libraryTarget: platform === "node" ? "commonjs2" : "var",
        library: "suite",
      },
      target: platform === "node" ? "node" : "web",
      externals: platform === "node" ? ["benchmark"] : [],
    };

    webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        console.error("Webpack build error:", err || stats.toJson().errors);
        reject(err);
        return;
      }
      console.log(`Bundle created at ${outputPath}`);
      resolve();
    });
  });
}

// Driver code
(async () => {
  const perfFiles = readPerfFiles(__dirname);
  console.log(`Found ${perfFiles.length} performance files`);

  for (let i = 0; i < perfFiles.length; i++) {
    const filePath = perfFiles[i];
    console.log(`Processing ${filePath}`);
    const { metadata, imports, source } = readPerfFile(filePath);
    console.log(`Generating bundles for ${metadata.title}`);

    const bundleSource = createBundleSource(metadata, imports, source);
    const bundleFileName = goodFileName(metadata.title);
    // Write bundle source to file
    const bundleSourcePath = path.join(
      __dirname,
      "build",
      `${bundleFileName}-bundle-source.js`
    );

    fs.writeFileSync(bundleSourcePath, bundleSource);

    // Define the output file paths
    const webBundlePath = path.join(
      __dirname,
      "build",
      `${bundleFileName}-web-bundle.js`
    );
    const nodeBundlePath = path.join(
      __dirname,
      "build",
      `${bundleFileName}-node-bundle.js`
    );

    // Bundle for the web
    await bundleWithWebpack(bundleSourcePath, webBundlePath, "web");

    // Bundle for Node
    await bundleWithWebpack(bundleSourcePath, nodeBundlePath, "node");
  }
})();
