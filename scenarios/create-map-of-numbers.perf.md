---
title: "Create a map type with one number in it"
---

```js
import { types } from "mobx-state-tree";
```

```js
types.map(types.number).create({ number: 1 });
```
