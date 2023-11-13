---
title: "Add 1 object to an array"
---

```js
import { types } from "mobx-state-tree";
```

```js
const SampleModel = types.model({
  name: types.string,
  id: types.string,
});

const SampleStore = types
  .model({
    items: types.array(SampleModel),
  })
  .actions((self) => ({
    add(name, id) {
      self.items.push({ name, id });
    },
  }));

/**
 * Requested by the community in https://github.com/coolsoftwaretyler/mst-performance-testing/issues/26
 */
const store = SampleStore.create({ items: [] });
store.add(`item-1`, `id-1`);
```
