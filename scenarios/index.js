import {
  ModelWithPrimitivesAndActions,
  createNModels,
} from "./model-creation.js";
import {
  addMiddleware,
  applyAction,
  getSnapshot,
  types,
} from "mobx-state-tree";
import {
  mstTypeCheckModelSuccess,
  mstTypeCheckModelFailure,
  mstTypeCheckSnapshotSuccess,
  mstTypeCheckSnapshotFailure,
  zodTypeCheckSuccess,
  zodTypeCheckFailure,
} from "./zod-comparison.js";
import { declareReferenceAndRetrieveIt } from "./references.js";
import {
  getComputedValueOnce,
  getComputedValueTwice,
  getViewWithParameter,
  getViewWithParameterTwice,
} from "./derived-values.js";
import { addNObjectsToArray } from "./array-operations.js";
import {
  takeSingleSnapshot,
  createModelWithSnapshotListener,
  executeSimpleSnapshotListenerFromAction,
  applySnapshotToModel,
  applySnapshotToModelWithListener,
} from "./snapshots.js";
/**
 * Below, write scenarios. Each scenario should be exported.
 * It should be an object with a title, descriptoin, and a function.
 *
 * Feel free to write helper functions or split things up in this directory,
 * but make sure that the scenario is exported and has a title and longDescription,
 * along with a function to run. That will get picked up in ../runner.js
 */

// Scenario 1 is just creating one model
// export const scenario1 = {
//   title: "Create 1 model",
//   longDescription:
//     "Create 1 model with all primitive types, along with a setter action for each.",
//   run: () => {
//     createNModels(1);
//   },
// };

// // Scenario 2 is creating 10 models
// export const scenario2 = {
//   title: "Create 10 models",
//   longDescription:
//     "Create 10 models with all primitive types, along with a setter action for each.",
//   run: () => {
//     createNModels(10);
//   },
// };

// // Scenario 3 is creating 100 models
// export const scenario3 = {
//   title: "Create 100 models",
//   longDescription:
//     "Create 100 models with all primitive types, along with a setter action for each.",
//   run: () => {
//     createNModels(100);
//   },
// };

// // Scenario 4 is creating 1,000 models
// export const scenario4 = {
//   title: "Create 1,000 models",
//   longDescription:
//     "Create 1,000 models with all primitive types, along with a setter action for each.",
//   run: () => {
//     createNModels(1000);
//   },
// };

// // Scenario 5 is creating 10,000 models
// export const scenario5 = {
//   title: "Create 10,000 models",
//   longDescription:
//     "Create 10,000 models with all primitive types, along with a setter action for each.",
//   run: () => {
//     createNModels(10000);
//   },
// };

// // Scenario 6 is creating 100,000 models
// export const scenario6 = {
//   title: "Create 100,000 models",
//   longDescription:
//     "Create 100,000 models with all primitive types, along with a setter action for each.",
//   run: () => {
//     createNModels(100000);
//   },
// };

// // Scenario 7 creates 1 model and sets a string value
// export const scenario7 = {
//   title: "Create 1 model and set a string value",
//   longDescription:
//     "Create 1 model with all primitive types, along with a setter action for each. Then, set a string value.",
//   run: () => {
//     ModelWithPrimitivesAndActions.create({
//       string: "string",
//       number: 1,
//       integer: 1,
//       float: 1.1,
//       boolean: true,
//       date: new Date(),
//     }).setString("new string");
//   },
// };

// // Scenario 8 creates 1 model and sets a number value
// export const scenario8 = {
//   title: "Create 1 model and set a number value",
//   longDescription:
//     "Create 1 model with all primitive types, along with a setter action for each. Then, set a number value.",
//   run: () => {
//     ModelWithPrimitivesAndActions.create({
//       string: "string",
//       number: 1,
//       integer: 1,
//       float: 1.1,
//       boolean: true,
//       date: new Date(),
//     }).setNumber(2);
//   },
// };

// // Scenario 9 creates 1 model and sets an integer value
// export const scenario9 = {
//   title: "Create 1 model and set an integer value",
//   longDescription:
//     "Create 1 model with all primitive types, along with a setter action for each. Then, set an integer value.",
//   run: () => {
//     ModelWithPrimitivesAndActions.create({
//       string: "string",
//       number: 1,
//       integer: 1,
//       float: 1.1,
//       boolean: true,
//       date: new Date(),
//     }).setInteger(2);
//   },
// };

// // Scenario 10 creates 1 model and sets a float value
// export const scenario10 = {
//   title: "Create 1 model and set a float value",
//   longDescription:
//     "Create 1 model with all primitive types, along with a setter action for each. Then, set a float value.",
//   run: () => {
//     ModelWithPrimitivesAndActions.create({
//       string: "string",
//       number: 1,
//       integer: 1,
//       float: 1.1,
//       boolean: true,
//       date: new Date(),
//     }).setFloat(2.2);
//   },
// };

// // Scenario 11 creates 1 model and sets a boolean value
// export const scenario11 = {
//   title: "Create 1 model and set a boolean value",
//   longDescription:
//     "Create 1 model with all primitive types, along with a setter action for each. Then, set a boolean value.",
//   run: () => {
//     ModelWithPrimitivesAndActions.create({
//       string: "string",
//       number: 1,
//       integer: 1,
//       float: 1.1,
//       boolean: true,
//       date: new Date(),
//     }).setBoolean(false);
//   },
// };

// // Scenario 12 creates 1 model and sets a date value
// export const scenario12 = {
//   title: "Create 1 model and set a date value",
//   longDescription:
//     "Create 1 model with all primitive types, along with a setter action for each. Then, set a date value.",
//   run: () => {
//     ModelWithPrimitivesAndActions.create({
//       string: "string",
//       number: 1,
//       integer: 1,
//       float: 1.1,
//       boolean: true,
//       date: new Date(),
//     }).setDate(new Date());
//   },
// };

// // Create a types.string
// export const scenario13 = {
//   title: "Create a types.string",
//   longDescription: "Create a types.string.",
//   run: () => {
//     types.string.create("string");
//   },
// };

// // Create a types.number
// export const scenario14 = {
//   title: "Create a types.number",
//   longDescription: "Create a types.number.",
//   run: () => {
//     types.number.create(1);
//   },
// };

// // Create a types.integer
// export const scenario15 = {
//   title: "Create a types.integer",
//   longDescription: "Create a types.integer.",
//   run: () => {
//     types.integer.create(1);
//   },
// };

// // Create a types.float
// export const scenario16 = {
//   title: "Create a types.float",
//   longDescription: "Create a types.float.",
//   run: () => {
//     types.float.create(1.1);
//   },
// };

// // Create a types.boolean
// export const scenario17 = {
//   title: "Create a types.boolean",
//   longDescription: "Create a types.boolean.",
//   run: () => {
//     types.boolean.create(true);
//   },
// };

// // Create a types.Date
// export const scenario18 = {
//   title: "Create a types.Date",
//   longDescription: "Create a types.Date.",
//   run: () => {
//     types.Date.create(new Date());
//   },
// };

// // Create a types.array(types.string)
// export const scenario19 = {
//   title: "Create a types.array(types.string)",
//   longDescription: "Create a types.array(types.string).",
//   run: () => {
//     types.array(types.string).create(["string"]);
//   },
// };

// // Create a types.array(types.number)
// export const scenario20 = {
//   title: "Create a types.array(types.number)",
//   longDescription: "Create a types.array(types.number).",
//   run: () => {
//     types.array(types.number).create([1]);
//   },
// };

// // Create a types.array(types.integer)
// export const scenario21 = {
//   title: "Create a types.array(types.integer)",
//   longDescription: "Create a types.array(types.integer).",
//   run: () => {
//     types.array(types.integer).create([1]);
//   },
// };

// // Create a types.array(types.float)
// export const scenario22 = {
//   title: "Create a types.array(types.float)",
//   longDescription: "Create a types.array(types.float).",
//   run: () => {
//     types.array(types.float).create([1.1]);
//   },
// };

// // Create a types.array(types.boolean)
// export const scenario23 = {
//   title: "Create a types.array(types.boolean)",
//   longDescription: "Create a types.array(types.boolean).",
//   run: () => {
//     types.array(types.boolean).create([true]);
//   },
// };

// // Create a types.array(types.Date)
// export const scenario24 = {
//   title: "Create a types.array(types.Date)",
//   longDescription: "Create a types.array(types.Date).",
//   run: () => {
//     types.array(types.Date).create([new Date()]);
//   },
// };

// // Create a types.map(types.string)
// export const scenario25 = {
//   title: "Create a types.map(types.string)",
//   longDescription: "Create a types.map(types.string).",
//   run: () => {
//     types.map(types.string).create({ string: "string" });
//   },
// };

// // Create a types.map(types.number)
// export const scenario26 = {
//   title: "Create a types.map(types.number)",
//   longDescription: "Create a types.map(types.number).",
//   run: () => {
//     types.map(types.number).create({ number: 1 });
//   },
// };

// // Create a types.map(types.integer)
// export const scenario27 = {
//   title: "Create a types.map(types.integer)",
//   longDescription: "Create a types.map(types.integer).",
//   run: () => {
//     types.map(types.integer).create({ integer: 1 });
//   },
// };

// // Create a types.map(types.float)
// export const scenario28 = {
//   title: "Create a types.map(types.float)",
//   longDescription: "Create a types.map(types.float).",
//   run: () => {
//     types.map(types.float).create({ float: 1.1 });
//   },
// };

// // Create a types.map(types.boolean)
// export const scenario29 = {
//   title: "Create a types.map(types.boolean)",
//   longDescription: "Create a types.map(types.boolean).",
//   run: () => {
//     types.map(types.boolean).create({ boolean: true });
//   },
// };

// // Create a types.map(types.Date)
// export const scenario30 = {
//   title: "Create a types.map(types.Date)",
//   longDescription: "Create a types.map(types.Date).",
//   run: () => {
//     types.map(types.Date).create({ date: new Date() });
//   },
// };

// export const scenario31 = {
//   title: "Check a valid model with MST typecheck",
//   run: () => {
//     mstTypeCheckModelSuccess();
//   },
// };

// export const scenario32 = {
//   title: "Check an invalid model with MST typecheck",
//   run: () => {
//     mstTypeCheckModelFailure();
//   },
// };

// export const scenario33 = {
//   title: "Check a valid snapshot with MST typecheck",
//   run: () => {
//     mstTypeCheckSnapshotSuccess();
//   },
// };

// export const scenario34 = {
//   title: "Check an invalid snapshot with MST typecheck",
//   run: () => {
//     mstTypeCheckSnapshotFailure();
//   },
// };

// export const scenario35 = {
//   title: "Check a valid model with Zod typecheck",
//   run: () => {
//     zodTypeCheckSuccess();
//   },
// };

// export const scenario36 = {
//   title: "Check an invalid model with Zod typecheck",
//   run: () => {
//     zodTypeCheckFailure();
//   },
// };

// export const scenario37 = {
//   title: "Create a model and add actions to it",
//   run: () => {
//     const Model = types
//       .model({
//         string: types.string,
//         number: types.number,
//         integer: types.integer,
//         float: types.float,
//         boolean: types.boolean,
//         date: types.Date,
//       })
//       .actions((self) => ({
//         setString: (string) => {
//           self.string = string;
//         },
//         setNumber: (number) => {
//           self.number = number;
//         },
//         setInteger: (integer) => {
//           self.integer = integer;
//         },
//         setFloat: (float) => {
//           self.float = float;
//         },
//         setBoolean: (boolean) => {
//           self.boolean = boolean;
//         },
//         setDate: (date) => {
//           self.date = date;
//         },
//       }));

//     Model.create({
//       string: "string",
//       number: 1,
//       integer: 1,
//       float: 1.1,
//       boolean: true,
//       date: new Date(),
//     }).setString("new string");
//   },
// };

// export const scenario38 = {
//   title: "Create a model and add views to it",
//   run: () => {
//     const Model = types
//       .model({
//         string: types.string,
//         number: types.number,
//         integer: types.integer,
//         float: types.float,
//         boolean: types.boolean,
//         date: types.Date,
//       })
//       .views((self) => ({
//         getString: () => {
//           return self.string;
//         },
//         getNumber: () => {
//           return self.number;
//         },
//         getInteger: () => {
//           return self.integer;
//         },
//         getFloat: () => {
//           return self.float;
//         },
//         getBoolean: () => {
//           return self.boolean;
//         },
//         getDate: () => {
//           return self.date;
//         },
//       }));

//     Model.create({
//       string: "string",
//       number: 1,
//       integer: 1,
//       float: 1.1,
//       boolean: true,
//       date: new Date(),
//     }).getString();
//   },
// };

// export const scenario39 = {
//   title: "Create a model and add both actions and views to it",
//   run: () => {
//     const Model = types
//       .model({
//         string: types.string,
//         number: types.number,
//         integer: types.integer,
//         float: types.float,
//         boolean: types.boolean,
//         date: types.Date,
//       })
//       .actions((self) => ({
//         setString: (string) => {
//           self.string = string;
//         },
//         setNumber: (number) => {
//           self.number = number;
//         },
//         setInteger: (integer) => {
//           self.integer = integer;
//         },
//         setFloat: (float) => {
//           self.float = float;
//         },
//         setBoolean: (boolean) => {
//           self.boolean = boolean;
//         },
//         setDate: (date) => {
//           self.date = date;
//         },
//       }))
//       .views((self) => ({
//         getString: () => {
//           return self.string;
//         },
//         getNumber: () => {
//           return self.number;
//         },
//         getInteger: () => {
//           return self.integer;
//         },
//         getFloat: () => {
//           return self.float;
//         },
//         getBoolean: () => {
//           return self.boolean;
//         },
//         getDate: () => {
//           return self.date;
//         },
//       }));

//     Model.create({
//       string: "string",
//       number: 1,
//       integer: 1,
//       float: 1.1,
//       boolean: true,
//       date: new Date(),
//     }).getString();
//   },
// };

// export const scenario40 = {
//   title: "Declare a model with a reference and retrieve a value from it",
//   run: () => {
//     declareReferenceAndRetrieveIt();
//   },
// };

// export const scenario41 = {
//   title: "Add onAction to a model",
//   run: () => {
//     const Todo = types.model({
//       task: types.string,
//     });

//     const TodoStore = types
//       .model({
//         todos: types.array(Todo),
//       })
//       .actions((self) => ({
//         add(todo) {
//           self.todos.push(todo);
//         },
//       }));

//     const s = TodoStore.create({ todos: [] });

//     let disposer = onAction(s, (call) => {
//       console.log(call);
//     });

//     return disposer;
//   },
// };

// export const scenario42 = {
//   title: "Add middleware to an action and include hooks (default)",
//   run: () => {
//     const Todo = types.model({
//       task: types.string,
//     });

//     const TodoStore = types
//       .model({
//         todos: types.array(Todo),
//       })
//       .actions((self) => ({
//         add(todo) {
//           self.todos.push(todo);
//         },
//       }));

//     const s = TodoStore.create({ todos: [] });

//     addMiddleware(s, () => {});
//   },
// };

// export const scenario43 = {
//   title: "Add middleware to an action and do not include hooks",
//   run: () => {
//     const Todo = types.model({
//       task: types.string,
//     });

//     const TodoStore = types
//       .model({
//         todos: types.array(Todo),
//       })
//       .actions((self) => ({
//         add(todo) {
//           self.todos.push(todo);
//         },
//       }));

//     const s = TodoStore.create({ todos: [] });

//     addMiddleware(s, () => {}, false);
//   },
// };

// export const scenario44 = {
//   title: "Create 1 model and set a string value using applyAction",
//   run: () => {
//     ModelWithPrimitivesAndActions.create({
//       string: "string",
//       number: 1,
//       integer: 1,
//       float: 1.1,
//       boolean: true,
//       date: new Date(),
//     });

//     applyAction(ModelWithPrimitivesAndActions, {
//       name: "setString",
//       path: "",
//       args: ["new string"],
//     });
//   },
// };

// export const scenario45 = {
//   title: "Create 1 model and set a number value using applyAction",
//   run: () => {
//     ModelWithPrimitivesAndActions.create({
//       string: "string",
//       number: 1,
//       integer: 1,
//       float: 1.1,
//       boolean: true,
//       date: new Date(),
//     });

//     applyAction(ModelWithPrimitivesAndActions, {
//       name: "setNumber",
//       path: "",
//       args: [2],
//     });
//   },
// };

// export const scenario46 = {
//   title: "Create 1 model and set an integer value using applyAction",
//   run: () => {
//     ModelWithPrimitivesAndActions.create({
//       string: "string",
//       number: 1,
//       integer: 1,
//       float: 1.1,
//       boolean: true,
//       date: new Date(),
//     });

//     applyAction(ModelWithPrimitivesAndActions, {
//       name: "setInteger",
//       path: "",
//       args: [2],
//     });
//   },
// };

// export const scenario47 = {
//   title: "Create 1 model and set a float value using applyAction",
//   run: () => {
//     ModelWithPrimitivesAndActions.create({
//       string: "string",
//       number: 1,
//       integer: 1,
//       float: 1.1,
//       boolean: true,
//       date: new Date(),
//     });

//     applyAction(ModelWithPrimitivesAndActions, {
//       name: "setFloat",
//       path: "",
//       args: [2.2],
//     });
//   },
// };

// export const scenario48 = {
//   title: "Create 1 model and set a boolean value using applyAction",
//   run: () => {
//     ModelWithPrimitivesAndActions.create({
//       string: "string",
//       number: 1,
//       integer: 1,
//       float: 1.1,
//       boolean: true,
//       date: new Date(),
//     });

//     applyAction(ModelWithPrimitivesAndActions, {
//       name: "setBoolean",
//       path: "",
//       args: [false],
//     });
//   },
// };

// export const scenario49 = {
//   title: "Create 1 model and set a date value using applyAction",
//   run: () => {
//     ModelWithPrimitivesAndActions.create({
//       string: "string",
//       number: 1,
//       integer: 1,
//       float: 1.1,
//       boolean: true,
//       date: new Date(),
//     });

//     applyAction(ModelWithPrimitivesAndActions, {
//       name: "setDate",
//       path: "",
//       args: [new Date()],
//     });
//   },
// };

// export const scenario50 = {
//   title: "Get a computed value once",
//   run: () => {
//     getComputedValueOnce();
//   },
// };

// export const scenario51 = {
//   title: "Get a computed value twice (should be cached)",
//   run: () => {
//     getComputedValueTwice();
//   },
// };

// export const scenario52 = {
//   title: "Get a view with a parameter once",
//   run: () => {
//     getViewWithParameter();
//   },
// };

// export const scenario53 = {
//   title: "Get a view with a parameter twice (not cached)",
//   run: () => {
//     getViewWithParameterTwice();
//   },
// };

// /**
//  * Different permutations of a requested benchmark from
//  * https://github.com/coolsoftwaretyler/mst-performance-testing/issues/26
//  */
// export const scenario54 = {
//   title: "Add 1 object to an array",
//   run: () => {
//     addNObjectsToArray(1);
//   },
// };

// export const scenario55 = {
//   title: "Add 10 objects to an array",
//   run: () => {
//     addNObjectsToArray(10);
//   },
// };

// export const scenario56 = {
//   title: "Add 100 objects to an array",
//   run: () => {
//     addNObjectsToArray(100);
//   },
// };

// export const scenario57 = {
//   title: "Add 1,000 objects to an array",
//   run: () => {
//     addNObjectsToArray(1000);
//   },
// };

// export const scenario58 = {
//   title: "Add 10,000 objects to an array",
//   run: () => {
//     addNObjectsToArray(10000);
//   },
// };

// export const scenario59 = {
//   title: "Add 100,000 objects to an array",
//   run: () => {
//     addNObjectsToArray(100000);
//   },
// };

export const scenario60 = {
  title: "Get a snapshot of a model",
  run: () => {
    takeSingleSnapshot();
  },
};

export const scenario61 = {
  title: "Define and create a model with an onSnapshot listener",
  run: () => {
    createModelWithSnapshotListener();
  },
};

export const scenario62 = {
  title: "Execute a simple onSnapshot listener from an action",
  run: () => {
    executeSimpleSnapshotListenerFromAction();
  },
};

export const scenario63 = {
  title: "Apply a snapshot to a model",
  run: () => {
    applySnapshotToModel();
  },
};

export const scenario64 = {
  title: "Apply a snapshot to a model with a listener",
  run: () => {
    applySnapshotToModelWithListener();
  },
};
