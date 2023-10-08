We use [Benchmark.js](https://benchmarkjs.com/) for actually running our benchmark scenarios. It's an older library that doesn't play well in a variety of bundlers.

Our node runner manages to read from the npm package just fine, but getting it to work correctly in a web runner was a pain. To fix that, the script at `../puppeteer.cjs` adds both benchmark.js and its one dependency, [lodash](https://lodash.com/) by reading these files and inlining them with Puppeteer.
