---
title: "Create an array type with one integer"
---

```js
import { types } from "mobx-state-tree";
```

```js
types.array(types.integer).create([1]);
```
