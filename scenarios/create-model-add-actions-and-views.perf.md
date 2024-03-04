---
title: "Create a model and add actions and views to it"
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
  }))
  .views((self) => ({
    getString: () => {
      return self.string;
    },
    getNumber: () => {
      return self.number;
    },
    getInteger: () => {
      return self.integer;
    },
    getFloat: () => {
      return self.float;
    },
    getBoolean: () => {
      return self.boolean;
    },
    getDate: () => {
      return self.date;
    },
  }));
```
