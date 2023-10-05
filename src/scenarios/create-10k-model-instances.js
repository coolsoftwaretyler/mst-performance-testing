import { types } from "mobx-state-tree";

let maxMemoryUsage = 0;

function logMemoryUsage() {
  const used = process.memoryUsage();
  const memoryInMB = used.heapUsed / 1024 / 1024;

  if (memoryInMB > maxMemoryUsage) {
    maxMemoryUsage = memoryInMB;
  }
}

/**
 * Let's define a model that has one of each MST primitive: https://mobx-state-tree.js.org/overview/types#primitive-types
 */
const Model = types.model({
  string: types.string,
  number: types.number,
  integer: types.integer,
  float: types.float,
  boolean: types.boolean,
  date: types.Date,
});

/** Now make 10,000 instances of a Model, and time it */
const start = performance.now();
for (let i = 0; i < 10000; i++) {
  Model.create({
    string: "string",
    number: 1,
    integer: 1,
    float: 1.1,
    boolean: true,
    date: new Date(),
  });
  logMemoryUsage();
}
const end = performance.now();

const result = `Create 10,000 model instances, ${
  end - start
}, ${maxMemoryUsage}`;

console.log(result);
