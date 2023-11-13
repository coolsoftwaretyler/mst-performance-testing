---
title: "Create a model and add actions to it"
---

```js
import { types } from "mobx-state-tree";
```

```js
const Model = types
  .model({
    string: types.string,
    number: types.number,
    integer: types.integer,
    float: types.float,
    boolean: types.boolean,
    date: types.Date,
  })
  .actions((self) => ({
    setString: (string) => {
      self.string = string;
    },
    setNumber: (number) => {
      self.number = number;
    },
    setInteger: (integer) => {
      self.integer = integer;
    },
    setFloat: (float) => {
      self.float = float;
    },
    setBoolean: (boolean) => {
      self.boolean = boolean;
    },
    setDate: (date) => {
      self.date = date;
    },
  }));
```
