import * as Scenarios from "../scenarios/index.js";

var suite = new Benchmark.Suite();

const tests = [];

const maxMemoryUsageByScenario = {};

suite
  .on("cycle", function (event) {
    console.log(String(event.target));
    tests.push(String(event.target));
  })
  .on("complete", function () {
    // We have strings in tests that look like this: Create 1 model x 9,197 ops/sec ±6.14% (76 runs sampled)
    // and in maxMemoryUsageByScenario that look like this: { "Create 1 model": 94253056 }
    // We want to combine these into a csv output that looks like:
    // "Create 1 model", 94253056, 9197, 6.14, 76, where the headers would be:
    // scenario, memory, ops/sec, +/-, runs
    // We can do this by parsing the strings and combining the objects
    // First, we need to create an array of objects from the tests array

    const testsArray = tests.map((test) => {
      // Split scenario as whatever comes before split on ("x")
      const scenario = test.split(" x ")[0].trim();
      // Now regex for any number that comes after "x " and before " ops/sec". We may have commas in the number, so we need to remove them.
      const opsSec = Number(
        test.match(/(?<=x\s)(.*)(?=\sops\/sec)/)[0].replace(/,/g, "")
      );
      // Now regex for any number that comes after "±" and before "%"
      const plusMinus = Number(test.match(/(?<=±)(.*)(?=%)/)[0]);
      // Now regex for any number that comes after "(" and before " runs"
      const runs = Number(test.match(/(?<=\()(.*)(?=\sruns)/)[0]);
      // Return an object with the above values
      return { scenario, opsSec, plusMinus, runs };
    });

    // Now we need to create an array of objects from the maxMemoryUsageByScenario object
    const memoryArray = Object.keys(maxMemoryUsageByScenario).map((key) => {
      return { scenario: key, memory: maxMemoryUsageByScenario[key] };
    });

    // Now we need to combine the two arrays of objects into one array of objects
    const combinedArray = testsArray.map((test) => {
      // Find the matching object in the memoryArray
      const memoryObject = memoryArray.find(
        (memory) => memory.scenario === test.scenario
      );
      // Combine the two objects into one
      return { ...test, ...memoryObject };
    });

    // Now we need to convert the array of objects into a csv
    // First, create an array of headers
    const headers = ["scenario", "memory_kb", "ops/sec", "+/-", "runs"];
    // Now create an array of arrays of values
    const values = combinedArray.map((test) => {
      return [
        test.scenario,
        test.memory,
        test.opsSec,
        test.plusMinus,
        test.runs,
      ];
    });

    // Now we need to combine the headers and values into one array
    const csvArray = [headers, ...values];

    // Just console log so we can read it from the terminal, but format it like a csv would need to be:
    const csvString = csvArray.map((row) => row.join(",")).join("\n");
    console.log(csvString);
  });

// Function to measure memory usage in a web browser
function getMemoryUsage() {
  if (performance && performance.memory) {
    return performance.memory.usedJSHeapSize;
  }
  return 0;
}

for (const scenario in Scenarios) {
  const { title, run } = Scenarios[scenario];

  // Track memory usage for each scenario
  suite.add(title, function () {
    const memoryUsage = getMemoryUsage();
    if (
      !maxMemoryUsageByScenario[title] ||
      memoryUsage > maxMemoryUsageByScenario[title]
    ) {
      maxMemoryUsageByScenario[title] = memoryUsage;
    }

    run(); // Run the scenario
  });
}

suite.run();
