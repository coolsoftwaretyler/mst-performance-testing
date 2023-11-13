---
title: "Create 1 model and set a string value"
---

```js
import { types } from "mobx-state-tree";
```

```js
const ModelWithPrimitivesAndActions = types
  .model({
    string: types.string,
    number: types.number,
    integer: types.integer,
    float: types.float,
    boolean: types.boolean,
    date: types.Date,
  })
  .actions((self) => ({
    setString(string) {
      self.string = string;
    },
    setNumber(number) {
      self.number = number;
    },
    setInteger(integer) {
      self.integer = integer;
    },
    setFloat(float) {
      self.float = float;
    },
    setBoolean(boolean) {
      self.boolean = boolean;
    },
    setDate(date) {
      self.date = date;
    },
  }));

ModelWithPrimitivesAndActions.create({
  string: "string",
  number: 1,
  integer: 1,
  float: 1.1,
  boolean: true,
  date: new Date(),
}).setFloat(1.25);
```
