# MobX-State-Tree Performance Testing

This repo is intended to test the performance of [MobX-State-Tree](https://github.com/mobxjs/mobx-state-tree). [Read a longer form blog post about the intention behind this repository](https://coolsoftware.dev/blog/benchmarking-mobx-state-tree/)

## Dependencies

In order to run the tests here, you'll need:

1. [Node and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) in order to run node scripts and download dependencies with `npm`.
1. [bun](https://bun.sh/) to run node benchmarks in bun.
1. [git](https://git-scm.com/) for source code management.
1. [bash](https://www.gnu.org/software/bash/), or anything that can run `.sh` files
1. Some GNU tools that most Mac OS and Linux systems should have built in: [tee](https://www.gnu.org/software/coreutils/manual/html_node/tee-invocation.html), [date](https://www.gnu.org/software/coreutils/manual/html_node/Examples-of-date.html), [grep](https://www.gnu.org/software/grep/), [tail](https://www.gnu.org/software/coreutils/manual/html_node/tail-invocation.html), [awk](https://www.gnu.org/software/gawk/manual/gawk.html), [sed](https://www.gnu.org/software/sed/), [echo](https://www.gnu.org/software/coreutils/manual/html_node/echo-invocation.html), [rm](https://www.gnu.org/software/coreutils/manual/html_node/rm-invocation.html).

## Setup and running tests

```sh
npm install # install dependencies
npm run test:node # just test node
npm run test:web # just test web
npm run test:hermes # just test Hermes (not yet supported)
```

Each one of these commands will write its output to `results/<mst-version>-<timestamp>-<platform>-results.csv`. Each scenario has a title, which should provide a short description of what it demonstrates. We use [Benchmark.js](https://benchmarkjs.com/) to get the operations per second of that scenario, along with the margin of error and number of runs used to reach statistical significance. The last column of the result is the maximum memory usage during testing for that scenario, in bytes.

### Changing MST versions

If you want to run the suite against different versions of MST, before you run tests, you can:

```sh
npm install mobx-state-tree@desired-version --save
```

And your output file will write the version number in the file name to make it easy to keep track of.

## How to add scenarios

If you'd like to measure some kind of operation in MobX-State-Tree, you'll need to add a scenario to `scenarios/index.js`. Every scenario must be a plain JavaScript object with:

1. `title`: this is the title you'll see during each test run, and in the results
2. `longDescription`: not yet used, but please consider writing more detail about your scenario.
3. `run`: this should be a synchronous function that exercises what you want to test.

Each scenario must be exported from `scenarios/index.js` to be picked up. Here's an example:

```js
import { createNModels } from "./model-creation.js";

export const scenario1 = {
  title: "Create 1 model",
  longDescription:
    "Create 1 model with all primitive types, along with a setter action for each.",
  run: () => {
    createNModels(1);
  },
};
```

These exported functions get imported in `./runner.js`, and then bundled for node and web separately. We run the node bundle with `node`, and we have a [Puppeteer](https://pptr.dev/) script that loads, executes, and reports the output of the web bundle. That's at `puppeteer.cjs`.

Feel free to write helper functions and different types of set up in the `scenarios` folder. Please avoid using APIs specific to web browsers, node, or React Native. We aren't yet set up to handle those differences.
