---
title: "Create a map type with one Date in it"
---

```js
import { types } from "mobx-state-tree";
```

```js
types.map(types.Date).create({ date: new Date() });
```
