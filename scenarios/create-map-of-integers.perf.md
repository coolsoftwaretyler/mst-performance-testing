---
title: "Create a map type with one integer in it"
---

```js
import { types } from "mobx-state-tree";
```

```js
types.map(types.integer).create({ integer: 1 });
```
