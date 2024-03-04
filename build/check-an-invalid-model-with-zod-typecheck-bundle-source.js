
import { z } from "zod";
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

suite.add("Check an invalid model with Zod typecheck", () => {
  const startMemory = getStartMemory();
  const ExampleSchemaZod = z.object({
  id: z.number(),
  name: z.string(),
  age: z.number(),
  isHappy: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  favoriteColors: z.array(z.string()),
  favoriteNumbers: z.array(z.number()),
  favoriteFoods: z.array(
    z.object({
      name: z.string(),
      calories: z.number(),
    })
  ),
});

const schemaFail = {
  id: 1,
  name: "John",
};

// We expect an error here from Zod, so just catch it and keep going.
try {
  ExampleSchemaZod.parse(schemaFail);
} catch (e) {
  return;
}
 
  const endMemory = getEndMemory();
  const memoryUsed = endMemory - startMemory;
  trackMaxMemory("Check an invalid model with Zod typecheck", memoryUsed);
});

suite.on("cycle", function (event) {
  console.log(String(event.target));
});

suite.run();
