const puppeteer = require("puppeteer");
const fs = require("fs");
const util = require("util");

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  }); // Open the first tab
  const page = await browser.newPage();

  // Listen to console messages
  page.on("console", (msg) => {
    console.log(`Console: ${msg.text()}`);
  });

  const bundlesDirectory = "./build/web";
  const dirFiles = await readdir(bundlesDirectory);
  // Filter any files that are not .js files
  const bundleFiles = dirFiles.filter((file) => file.endsWith(".js"));

  for (const bundleFile of bundleFiles) {
    const bundlePath = `${bundlesDirectory}/${bundleFile}`;

    // Record start time
    const startTime = new Date();

    // Open a new tab for each bundle
    const newPage = await browser.newPage();

    // Inject the bundle into the new page
    const bundleCode = await readFile(bundlePath, "utf-8");
    await newPage.evaluate(bundleCode);

    // Record end time
    const endTime = new Date();
    const executionTime = endTime - startTime;

    // Get memory usage
    const performanceMetrics = await newPage.metrics();
    const maxMemoryUsage = performanceMetrics.JSHeapUsedSize;

    console.log(`Bundle: ${bundleFile}`);
    console.log(`Execution Time: ${executionTime}ms`);
    console.log(`Max Memory Usage: ${maxMemoryUsage / 1024} KB`);
    console.log("========================="); // Separator for each bundle

    // Close the new page when done
    await newPage.close();
  }

  // Close the browser when done
  await browser.close();
})();
