import { types } from "mobx-state-tree";

(() => {})();
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

/** Now make 100 instances of a Model */
for (let i = 0; i < 100; i++) {
  Model.create({
    string: "string",
    number: 1,
    integer: 1,
    float: 1.1,
    boolean: true,
    date: new Date(),
  });
}
