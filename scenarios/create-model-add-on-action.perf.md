---
title: "Add onAction to a model"
---

```js
import { types, onAction } from "mobx-state-tree";
```

```````js
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

let disposer = onAction(s, (call) => {
  console.log(call);
});

return disposer;
``````;
```````
