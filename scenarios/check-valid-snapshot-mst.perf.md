---
title: "Check a valid snapshot with MST typecheck"
---

```js
import { types, typecheck } from "mobx-state-tree";
```

```js
const ExampleModelMST = types.model({
  id: types.identifier,
  name: types.string,
  age: types.number,
  isHappy: types.boolean,
  createdAt: types.Date,
  updatedAt: types.maybeNull(types.Date),
  favoriteColors: types.array(types.string),
  favoriteNumbers: types.array(types.number),
  favoriteFoods: types.array(
    types.model({
      name: types.string,
      calories: types.number,
    })
  ),
});

typecheck(ExampleModelMST, {
  id: "1",
  name: "John",
  age: 42,
  isHappy: true,
  createdAt: new Date(),
  updatedAt: null,
  favoriteColors: ["blue", "green"],
  favoriteNumbers: [1, 2, 3],
  favoriteFoods: [
    {
      name: "Pizza",
      calories: 1000,
    },
  ],
});
```
