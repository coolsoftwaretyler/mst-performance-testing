---
title: "Check a reference and succeed"
---

```js
import { types } from "mobx-state-tree";
```

```js
const Car = types.model("Car", {
  id: types.identifier,
});

const CarStore = types.model("CarStore", {
  cars: types.array(Car),
  selectedCar: types.reference(Car),
});

// create a store with a normalized snapshot
const store = CarStore.create({
  cars: [
    {
      id: "47",
    },
  ],
  selectedCar: "47",
});

const isValid = isValidReference(() => store.selectedCar);

return isValid;
```
