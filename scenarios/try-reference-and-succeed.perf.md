---
title: "Try a reference and succeed"
---

```js
import { types, tryReference } from "mobx-state-tree";
```

```js
const Car = types.model("Car", {
  id: types.identifier,
});

const CarStore = types.model("CarStore", {
  cars: types.array(Car),
  selectedCar: types.maybe(types.reference(Car)),
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

const isValid = tryReference(() => store.selectedCar);

return isValid;
```
