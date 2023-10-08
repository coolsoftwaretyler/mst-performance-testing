import {
  ModelWithPrimitivesAndActions,
  createNModels,
} from "./model-creation.js";

/**
 * Below, write scenarios. Each scenario should be exported.
 * It should be an object with a title, descriptoin, and a function.
 *
 * Feel free to write helper functions or split things up in this directory,
 * but make sure that the scenario is exported and has a title and longDescription,
 * along with a function to run. That will get picked up in ../runner.js
 */

// Scenario 1 is just creating one model
export const scenario1 = {
  title: "Create 1 model",
  longDescription:
    "Create 1 model with all primitive types, along with a setter action for each.",
  run: () => {
    createNModels(1);
  },
};

// Scenario 2 is creating 10 models
export const scenario2 = {
  title: "Create 10 models",
  longDescription:
    "Create 10 models with all primitive types, along with a setter action for each.",
  run: () => {
    createNModels(10);
  },
};

// Scenario 3 is creating 100 models
export const scenario3 = {
  title: "Create 100 models",
  longDescription:
    "Create 100 models with all primitive types, along with a setter action for each.",
  run: () => {
    createNModels(100);
  },
};

// Scenario 4 is creating 1,000 models
export const scenario4 = {
  title: "Create 1,000 models",
  longDescription:
    "Create 1,000 models with all primitive types, along with a setter action for each.",
  run: () => {
    createNModels(1000);
  },
};

// Scenario 5 is creating 10,000 models
export const scenario5 = {
  title: "Create 10,000 models",
  longDescription:
    "Create 10,000 models with all primitive types, along with a setter action for each.",
  run: () => {
    createNModels(10000);
  },
};

// Scenario 6 is creating 100,000 models
export const scenario6 = {
  title: "Create 100,000 models",
  longDescription:
    "Create 100,000 models with all primitive types, along with a setter action for each.",
  run: () => {
    createNModels(100000);
  },
};

// Scenario 7 creates 1 model and sets a string value
export const scenario7 = {
  title: "Create 1 model and set a string value",
  longDescription:
    "Create 1 model with all primitive types, along with a setter action for each. Then, set a string value.",
  run: () => {
    ModelWithPrimitivesAndActions.create({
      string: "string",
      number: 1,
      integer: 1,
      float: 1.1,
      boolean: true,
      date: new Date(),
    }).setString("new string");
  },
};

// Scenario 8 creates 1 model and sets a number value
export const scenario8 = {
  title: "Create 1 model and set a number value",
  longDescription:
    "Create 1 model with all primitive types, along with a setter action for each. Then, set a number value.",
  run: () => {
    ModelWithPrimitivesAndActions.create({
      string: "string",
      number: 1,
      integer: 1,
      float: 1.1,
      boolean: true,
      date: new Date(),
    }).setNumber(2);
  },
};

// Scenario 9 creates 1 model and sets an integer value
export const scenario9 = {
  title: "Create 1 model and set an integer value",
  longDescription:
    "Create 1 model with all primitive types, along with a setter action for each. Then, set an integer value.",
  run: () => {
    ModelWithPrimitivesAndActions.create({
      string: "string",
      number: 1,
      integer: 1,
      float: 1.1,
      boolean: true,
      date: new Date(),
    }).setInteger(2);
  },
};

// Scenario 10 creates 1 model and sets a float value
export const scenario10 = {
  title: "Create 1 model and set a float value",
  longDescription:
    "Create 1 model with all primitive types, along with a setter action for each. Then, set a float value.",
  run: () => {
    ModelWithPrimitivesAndActions.create({
      string: "string",
      number: 1,
      integer: 1,
      float: 1.1,
      boolean: true,
      date: new Date(),
    }).setFloat(2.2);
  },
};

// Scenario 11 creates 1 model and sets a boolean value
export const scenario11 = {
  title: "Create 1 model and set a boolean value",
  longDescription:
    "Create 1 model with all primitive types, along with a setter action for each. Then, set a boolean value.",
  run: () => {
    ModelWithPrimitivesAndActions.create({
      string: "string",
      number: 1,
      integer: 1,
      float: 1.1,
      boolean: true,
      date: new Date(),
    }).setBoolean(false);
  },
};

// Scenario 12 creates 1 model and sets a date value
export const scenario12 = {
  title: "Create 1 model and set a date value",
  longDescription:
    "Create 1 model with all primitive types, along with a setter action for each. Then, set a date value.",
  run: () => {
    ModelWithPrimitivesAndActions.create({
      string: "string",
      number: 1,
      integer: 1,
      float: 1.1,
      boolean: true,
      date: new Date(),
    }).setDate(new Date());
  },
};
