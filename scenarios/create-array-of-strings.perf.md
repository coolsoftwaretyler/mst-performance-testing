---
title: "Create an array type with one string"
---

```js
import { types } from "mobx-state-tree";
```

```js
types.array(types.string).create(["string"]);
```
