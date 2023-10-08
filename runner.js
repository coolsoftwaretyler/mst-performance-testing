import * as Scenarios from "./scenarios/index.js";
import Benchmark from "benchmark"; // This is technically a no-op in the web bundle, but included for cross-compatibility

var suite = new Benchmark.Suite();

suite.on("complete", function () {
  const headers = ["scenario", "ops_per_sec", "margin_of_error", "runs"];
  const results = suite.filter("successful").map((benchmark) => {
    return {
      scenario: benchmark.name,
      opsSec: benchmark.hz,
      plusMinus: benchmark.stats.rme,
      runs: benchmark.stats.sample.length,
    };
  });

  console.log(headers.join(","));
  results.forEach((result) =>
    console.log(
      `${result.scenario},${result.opsSec},${result.plusMinus},${result.runs}`
    )
  );
});

for (const scenario in Scenarios) {
  const { title, run } = Scenarios[scenario];
  suite.add(title, run);
}

suite.run();
