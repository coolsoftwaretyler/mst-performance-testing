# MobX-State-Tree Performance Testing

This repo is intended to test the performance of [MobX-State-Tree](https://github.com/mobxjs/mobx-state-tree). More to come!

## Dependencies

In order to run the tests here, you'll need:

1. [Node and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) in order to run node scripts and download dependencies with `npm`.
2. `node-hermes`, which is [an unsupported tool provided by Hermes](https://github.com/tmikov/hermes/tree/fb7a2486787a2659f194936573c9a2cd1370541b/tools/node-hermes). [See more about building your own version](#building-node-hermes)
3. The [GNU time command](https://www.gnu.org/software/time/), available in your path as `gtime` (this helps maintain compatibility across Mac OS and Linux)
4. [git](https://git-scm.com/) for source code management.
5. [bash](https://www.gnu.org/software/bash/) or any shell that can evaluate `.sh` files (used to run Hermes and Node benchmarks).
6. (optional) If you don't want to set up your local environment, you can instead [run with Docker](#running-with-docker) and use a pre-built environment. But you'll need to have [Docker](https://www.docker.com/) available on your machine.

### Building node-hermes

[Hermes](https://hermesengine.dev/) is a JavaScript engine optimized for React Native. MobX-State-Tree cares about Hermes-based performance because: MobX-State-Tree has a long history of being popular in the React Native ecosystem, which now uses Hermes as its default JavaScript engine. Hermes [did a lot of work to support proxies](https://reactnative.dev/blog/2021/03/12/version-0.64#hermes-with-proxy-support), which MobX-State-Tree needs in order to use MobX 5+, along with [many other popular libraries](https://github.com/facebook/hermes/issues/33). We appreciate their work, and want to make sure we're always considering how our two projects interact.

However, for the purpose of this testing library, we didn't want to require an entire React Native set up to get benchmarks. We wanted to make our testing scenarios "Just Work" in a variety of environments.

Since we run scenarios in node with `node /path/to/scenario.js`, it would be awesome if there was some way we could run a given scenario with `hermes`.

Of course, you can [build Hermes from source](https://hermesengine.dev/docs/building-and-running#building-on-linux-and-macos), but the engine doesn't implement some critical APIs for writing useful MST scenarios. Fortunately, Hermes has an (unsupported) tool, called [`node-hermes`](https://github.com/tmikov/hermes/tree/fb7a2486787a2659f194936573c9a2cd1370541b/tools/node-hermes), which will run a JavaScript bundle like `node-hermes /path/to/bundle.js`

If you want to get a `node-hermes` binary on your machine, [follow the building instructions](https://hermesengine.dev/docs/building-and-running#building-on-linux-and-macos) for the Release Build, but where they tell you to run:

```sh
cmake -S hermes -B build_release -G Ninja -DCMAKE_BUILD_TYPE=Release
```

Add a new flag, and instead run:

```sh
cmake -S hermes -B build_release -G Ninja -DCMAKE_BUILD_TYPE=Release -DHERMES_BUILD_NODE_HERMES=ON
```

And in the `build_release/bin` folder, you'll find a `node-hermes` binary that should work with the benchmarking scripts and commands. You'll want to somehow get that binary into your path so that `node-hermes` points to the binary in your local machine. For me, I updated my PATH with:

```sh
# ~/.zshrc
export PATH="$PATH:/Users/tylerwilliams/build_release/bin" # Replace with the path to your local build here
```

That should help most folks running on Mac OS. If this is too much of a pain, consider running with Docker.

## Setup and running tests

```sh
npm install # install dependencies
npm run build # builds the JavaScript bundles to be tested. Bundles from ./scenarios -> build/(node | web)
npm run test:node # just test node
npm run test:hermes # just test hermes
npm run test:web # just test web
npm run test # test all three platforms
```

Those commands will just send output to stdout right now. If you want to record your run locally, you can instead run:

```
npm run record:local
```

And you'll get results in the `results/` directory, grouped by Hermes, Node, and Web.

Right now we don't have anything actually processing the output, but this is a place to record the runs, and we can write some utilities to process the results later.

## Running with Docker

Using the `Dockerfile` in this repo might help smooth over any environmental set up. To do so:

1. Assuming you already have Docker on your machine:
2. Build the image: `docker build -t mst-performance-testing .`
3. You can either run the tests from your command line with: `docker run -it --rm mst-performance-testing npm run test`
4. Or start a Docker container, enter it, and run commands from within the Docker connection.

As with the local runs, you can record your Docker results with:

```
npm run record:docker
```

And you'll get results in the `results/` directory, grouped by Hermes, Node, and Web.

Right now we don't have anything actually processing the output, but this is a place to record the runs, and we can write some utilities to process the results later.

## Understanding the results

Once you've run tests for a platform, you can then run:

```sh
npm run results:hermes # for Hermes
npm run results:node # for Node
npm run results: web # for web
```

And you'll get a file in `./results/<platform>-<timestamp>.csv` with columns for the scenario, time measured in milliseconds, and max memory used in kilobytes. We use the name of the file to describe the scenario at the moment, but eventually we should have a better place for comments.

These commands assume the text files from the measurement runs exist. If they do, you can generate these CSVs and use them for more detailed analysis.

## Next steps, todos, and thoughts

1. [ ] Need to add a way to change MST versions
1. [ ] Need to add helpful and welcoming instructions to add scenarios
1. [ ] Need to add helpful and welcoming instructions on interpreting results.
