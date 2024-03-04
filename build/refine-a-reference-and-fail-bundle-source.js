
import { types } from "mobx-state-tree";
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

suite.add("Refine a reference and fail", () => {
  const startMemory = getStartMemory();
  const Car = types.model("Car", {
  id: types.refinement(
    types.identifier,
    (identifier) => identifier.indexOf("Car_") === 0
  ),
});

const CarStore = types.model("CarStore", {
  cars: types.array(Car),
  selectedCar: types.reference(Car),
});

// create a store with a normalized snapshot
const storeInstance = CarStore.create({
  cars: [
    {
      id: "47",
    },
  ],
  selectedCar: "47",
});

return storeInstance.selectedCar.id; // throws
 
  const endMemory = getEndMemory();
  const memoryUsed = endMemory - startMemory;
  trackMaxMemory("Refine a reference and fail", memoryUsed);
});

suite.on("cycle", function (event) {
  console.log(String(event.target));
});

suite.run();