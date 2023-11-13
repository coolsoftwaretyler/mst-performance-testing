---
title: "Create a map type with one float in it"
---

```js
import { types } from "mobx-state-tree";
```

```js
types.map(types.float).create({ float: 1.1 });
```
