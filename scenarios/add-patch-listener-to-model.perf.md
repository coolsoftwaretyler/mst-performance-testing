---
title: "Add a patch listener to a model"
---

```js
import { types, onPatch } from "mobx-state-tree";
```

```js
const Model = types.model({
  string: types.string,
  number: types.number,
  integer: types.integer,
  float: types.float,
  boolean: types.boolean,
  date: types.Date,
});

const m = Model.create({
  string: "string",
  number: 1,
  integer: 1,
  float: 1.1,
  boolean: true,
  date: new Date(),
});

onPatch(m, (patch) => {
  return patch;
});
```
