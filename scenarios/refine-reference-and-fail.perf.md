---
title: "Refine a reference and fail"
---

```js
import { types } from "mobx-state-tree";
```

```js
const Car = types.model("Car", {
  id: types.refinement(
    types.identifier,
    (identifier) => identifier.indexOf("Car_") === 0
  ),
});

const CarStore = types.model("CarStore", {
  cars: types.array(Car),
  selectedCar: types.reference(Car),
});

// create a store with a normalized snapshot
const storeInstance = CarStore.create({
  cars: [
    {
      id: "47",
    },
  ],
  selectedCar: "47",
});

return storeInstance.selectedCar.id; // throws
```
