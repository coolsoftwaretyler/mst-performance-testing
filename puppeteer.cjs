const puppeteer = require("puppeteer");
const fs = require("fs").promises;

(async () => {
  // Check if the bundle file path is provided as a command line argument
  const bundleFilePath = process.argv[2];
  if (!bundleFilePath) {
    console.error("Error: Please provide a path to the web bundle file.");
    process.exit(1);
  }

  // Launch a headless browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--enable-precise-memory-info"],
  });

  // Open a new page
  const page = await browser.newPage();

  // Capture console logs from the page
  page.on("console", (consoleMessage) => {
    console.log(`${consoleMessage.text()}`);
  });

  // Read the contents of the local JavaScript files
  const lodashScript = await fs.readFile("./vendor/lodash.js", "utf-8");
  const benchmarkScript = await fs.readFile("./vendor/benchmark.js", "utf-8");
  const indexBundleScript = await fs.readFile(bundleFilePath, "utf-8");

  // HTML content with inlined JavaScript
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Performance Suite</title>
      </head>
      <body>
        <!-- Inline Lodash library -->
        <script>${lodashScript}</script>

        <!-- Inline Benchmark.js library -->
        <script>${benchmarkScript}</script>

        <!-- Inline local JavaScript file -->
        <script>
          ${indexBundleScript}

          // Signal that the script has finished
          window.scriptFinished = true;
        </script>
      </body>
    </html>
  `;

  // Set the HTML content of the page
  await page.setContent(htmlContent);

  // Wait for the script to finish (replace the condition with your specific logic)
  await page.waitForFunction("window.scriptFinished === true");

  // Close the browser
  await browser.close();
})();
