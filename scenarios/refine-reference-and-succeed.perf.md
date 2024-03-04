---
title: "Refine a reference and succeed"
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
      id: "Car_47",
    },
  ],
  selectedCar: "Car_47",
});

return storeInstance.selectedCar.id; // "Car_47"
```
