---
title: "Execute a simple snapshot listener"
---

```js
import { types, getSnapshot, applySnapshot, onSnapshot } from "mobx-state-tree";
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
  .actions((self) => {
    const changeString = (newString) => {
      self.string = newString;
    };

    return {
      changeString,
    };
  });

const m = Model.create({
  string: "string",
  number: 1,
  integer: 1,
  float: 1.1,
  boolean: true,
  date: new Date(),
});

onSnapshot(m, (snapshot) => {
  return snapshot;
});

m.changeString("newString");
```
