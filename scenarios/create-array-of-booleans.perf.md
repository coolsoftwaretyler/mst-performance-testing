---
title: "Create an array type with one boolean"
---

```js
import { types } from "mobx-state-tree";
```

```js
types.array(types.integer).create([true]);
```
