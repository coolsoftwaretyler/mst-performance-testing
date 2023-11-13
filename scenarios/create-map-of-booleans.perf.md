---
title: "Create a map type with one boolean in it"
---

```js
import { types } from "mobx-state-tree";
```

```js
types.map(types.boolean).create({ boolean: true });
```
