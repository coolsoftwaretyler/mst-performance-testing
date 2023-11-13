---
title: "Create a map type with one string in it"
---

```js
import { types } from "mobx-state-tree";
```

```js
types.map(types.string).create({ string: "string" });
```
