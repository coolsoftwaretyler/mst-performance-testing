---
title: "Create an array type with one Date"
---

```js
import { types } from "mobx-state-tree";
```

```js
types.array(types.Date).create([new Date()]);
```
