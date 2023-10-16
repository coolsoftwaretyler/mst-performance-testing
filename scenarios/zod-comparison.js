import { types, typecheck } from "mobx-state-tree";
import { z } from "zod";

const ExampleModelMST = types.model({
  id: types.identifier,
  name: types.string,
  age: types.number,
  isHappy: types.boolean,
  createdAt: types.Date,
  updatedAt: types.maybeNull(types.Date),
  favoriteColors: types.array(types.string),
  favoriteNumbers: types.array(types.number),
  favoriteFoods: types.array(
    types.model({
      name: types.string,
      calories: types.number,
    })
  ),
});

const FalseExampleModelMST = types.model({
  id: types.identifier,
  shouldMatch: false,
});

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

export const mstTypeCheckModelSuccess = () => {
  const model = ExampleModelMST.create({
    id: "1",
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
  });

  typecheck(ExampleModelMST, model);
};

export const mstTypeCheckModelFailure = () => {
  const model = ExampleModelMST.create({
    id: "1",
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
  });

  // We expect an error here from MST, so just catch it and keep going.
  try {
    typecheck(FalseExampleModelMST, model);
  } catch (e) {
    return;
  }
};

export const mstTypeCheckSnapshotSuccess = () => {
  typecheck(ExampleModelMST, {
    id: "1",
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
  });
};

export const mstTypeCheckSnapshotFailure = () => {
  try {
    typecheck(FalseExampleModelMST, {
      id: "1",
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
    });
  } catch (e) {
    return;
  }
};

export const zodTypeCheckSuccess = () => {
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
};

export const zodTypeCheckFailure = () => {
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
};
