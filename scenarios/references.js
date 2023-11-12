import {
  isValidReference,
  types,
  tryReference,
  applySnapshot,
} from "mobx-state-tree";

export const declareReferenceAndRetrieveIt = () => {
  const Todo = types.model({
    id: types.identifier,
    title: types.string,
  });

  const TodoStore = types.model({
    todos: types.array(Todo),
    selectedTodo: types.reference(Todo),
  });

  // create a store with a normalized snapshot
  const storeInstance = TodoStore.create({
    todos: [
      {
        id: "47",
        title: "Get coffee",
      },
    ],
    selectedTodo: "47",
  });

  return storeInstance.selectedTodo.title; // "Get coffee"
};

export const refineAReferenceAndSucceed = () => {
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
};

export const refineAReferenceAndFail = () => {
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
};

export const checkIfReferenceIsValidAndSucceed = () => {
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
};

export const checkIfReferenceIsValidAndFail = () => {
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

  applySnapshot(store, {
    ...store,
    selectedCar: "48",
  });

  const isValid = isValidReference(() => store.selectedCar);

  return isValid;
};

export const tryReferenceAndFail = () => {
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

  applySnapshot(store, {
    ...store,
    selectedCar: "48",
  });

  const isValid = tryReference(() => store.selectedCar);

  return isValid;
};

export const tryReferenceAndSucceed = () => {
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
};
