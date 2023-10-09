import {
  ModelWithPrimitivesAndActions,
  createNModels,
} from "./model-creation.js";
import { types } from "mobx-state-tree";

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

// Create a types.string
export const scenario13 = {
  title: "Create a types.string",
  longDescription: "Create a types.string.",
  run: () => {
    types.string.create("string");
  },
};

// Create a types.number
export const scenario14 = {
  title: "Create a types.number",
  longDescription: "Create a types.number.",
  run: () => {
    types.number.create(1);
  },
};

// Create a types.integer
export const scenario15 = {
  title: "Create a types.integer",
  longDescription: "Create a types.integer.",
  run: () => {
    types.integer.create(1);
  },
};

// Create a types.float
export const scenario16 = {
  title: "Create a types.float",
  longDescription: "Create a types.float.",
  run: () => {
    types.float.create(1.1);
  },
};

// Create a types.boolean
export const scenario17 = {
  title: "Create a types.boolean",
  longDescription: "Create a types.boolean.",
  run: () => {
    types.boolean.create(true);
  },
};

// Create a types.Date
export const scenario18 = {
  title: "Create a types.Date",
  longDescription: "Create a types.Date.",
  run: () => {
    types.Date.create(new Date());
  },
};

// Create a types.array(types.string)
export const scenario19 = {
  title: "Create a types.array(types.string)",
  longDescription: "Create a types.array(types.string).",
  run: () => {
    types.array(types.string).create(["string"]);
  },
};

// Create a types.array(types.number)
export const scenario20 = {
  title: "Create a types.array(types.number)",
  longDescription: "Create a types.array(types.number).",
  run: () => {
    types.array(types.number).create([1]);
  },
};

// Create a types.array(types.integer)
export const scenario21 = {
  title: "Create a types.array(types.integer)",
  longDescription: "Create a types.array(types.integer).",
  run: () => {
    types.array(types.integer).create([1]);
  },
};

// Create a types.array(types.float)
export const scenario22 = {
  title: "Create a types.array(types.float)",
  longDescription: "Create a types.array(types.float).",
  run: () => {
    types.array(types.float).create([1.1]);
  },
};

// Create a types.array(types.boolean)
export const scenario23 = {
  title: "Create a types.array(types.boolean)",
  longDescription: "Create a types.array(types.boolean).",
  run: () => {
    types.array(types.boolean).create([true]);
  },
};

// Create a types.array(types.Date)
export const scenario24 = {
  title: "Create a types.array(types.Date)",
  longDescription: "Create a types.array(types.Date).",
  run: () => {
    types.array(types.Date).create([new Date()]);
  },
};

// Create a types.map(types.string)
export const scenario25 = {
  title: "Create a types.map(types.string)",
  longDescription: "Create a types.map(types.string).",
  run: () => {
    types.map(types.string).create({ string: "string" });
  },
};

// Create a types.map(types.number)
export const scenario26 = {
  title: "Create a types.map(types.number)",
  longDescription: "Create a types.map(types.number).",
  run: () => {
    types.map(types.number).create({ number: 1 });
  },
};

// Create a types.map(types.integer)
export const scenario27 = {
  title: "Create a types.map(types.integer)",
  longDescription: "Create a types.map(types.integer).",
  run: () => {
    types.map(types.integer).create({ integer: 1 });
  },
};

// Create a types.map(types.float)
export const scenario28 = {
  title: "Create a types.map(types.float)",
  longDescription: "Create a types.map(types.float).",
  run: () => {
    types.map(types.float).create({ float: 1.1 });
  },
};

// Create a types.map(types.boolean)
export const scenario29 = {
  title: "Create a types.map(types.boolean)",
  longDescription: "Create a types.map(types.boolean).",
  run: () => {
    types.map(types.boolean).create({ boolean: true });
  },
};

// Create a types.map(types.Date)
export const scenario30 = {
  title: "Create a types.map(types.Date)",
  longDescription: "Create a types.map(types.Date).",
  run: () => {
    types.map(types.Date).create({ date: new Date() });
  },
};
