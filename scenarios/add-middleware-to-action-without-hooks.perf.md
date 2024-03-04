---
title: "Add middleware to an action without hooks"
---

```js
import { addMiddleware, types } from "mobx-state-tree";
```

```js
const Todo = types.model({
  task: types.string,
});

const TodoStore = types
  .model({
    todos: types.array(Todo),
  })
  .actions((self) => ({
    add(todo) {
      self.todos.push(todo);
    },
  }));

const s = TodoStore.create({ todos: [] });

addMiddleware(s, () => {}, false);
```
