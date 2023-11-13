---
title: "Check an invalid model with Zod typecheck"
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

const schemaFail = {
  id: 1,
  name: "John",
};

// We expect an error here from Zod, so just catch it and keep going.
try {
  ExampleSchemaZod.parse(schemaFail);
} catch (e) {
  return;
}
```
