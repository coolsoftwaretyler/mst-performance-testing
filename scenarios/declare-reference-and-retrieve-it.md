---
title: "Declare a model with a reference and retrieve a value from it"
---

```js
import { types } from "mobx-state-tree";
```

```js
const Todo = types.model({
  id: types.identifier,
  title: types.string,
});

const TodoStore = types.model({
  todos: types.array(Todo),
  selectedTodo: types.reference(Todo),
});

// create a store with a normalized snapshot
const storeInstance = TodoStore.create({
  todos: [
    {
      id: "47",
      title: "Get coffee",
    },
  ],
  selectedTodo: "47",
});

return storeInstance.selectedTodo.title; // "Get coffee"
```
