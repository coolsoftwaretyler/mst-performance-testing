---
title: "Check a valid model with Zod typecheck"
---

```js
import { z } from "zod";
```

```js
const ExampleSchemaZod = z.object({
  id: z.number(),
  name: z.string(),
  age: z.number(),
  isHappy: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  favoriteColors: z.array(z.string()),
  favoriteNumbers: z.array(z.number()),
  favoriteFoods: z.array(
    z.object({
      name: z.string(),
      calories: z.number(),
    })
  ),
});

const schemaSuccess = {
  id: 1,
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
};

ExampleSchemaZod.parse(schemaSuccess);
```
