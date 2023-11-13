---
title: "Add middleware and use it"
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

addMiddleware(s, (call, next) => {
  next(call);
});

s.add({ task: "string" });
```
