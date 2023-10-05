# MobX-State-Tree Performance Testing

This repo is intended to test the performance of [MobX-State-Tree](https://github.com/mobxjs/mobx-state-tree). More to come!

Right now it's running only locally on my machine, but once I sort out:

1. [x] node
2. [x] hermes
3. [ ] web

I will work on putting together:

1. Some list of setup dependencies
2. Containerization infrastructure

That way folks will be able to run it anywhere (and hopefully in the cloud).

Once we have these things working for all three target environments and running consistently, we will add mechanisms to test against different mobx-state-tree versions, and instructions on how to write scenarios to benchmark.

Current benchmark results come out as the output from [gnu-time](https://formulae.brew.sh/formula/gnu-time), but will eventually get formatted to something more useful.

Assuming you can:

1. Build [node-hermes](https://github.com/tmikov/hermes/tree/fb7a2486787a2659f194936573c9a2cd1370541b/tools/node-hermes) locally and wire it up in `benchmark-hermes.sh`
2. Have `gtime` running on Mac (or swap out `time` in a Linux environment)

You could run:

```sh
npm run test:node
npm run test:hermes
npm run test:web
npm run test
```

And see the beginnings of some results from the existing scenarios.
