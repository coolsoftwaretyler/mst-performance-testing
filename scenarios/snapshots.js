import { types, getSnapshot, applySnapshot, onSnapshot } from "mobx-state-tree";
export const takeSingleSnapshot = () => {
  const Model = types.model({
    string: types.string,
    number: types.number,
    integer: types.integer,
    float: types.float,
    boolean: types.boolean,
    date: types.Date,
  });

  const m = Model.create({
    string: "string",
    number: 1,
    integer: 1,
    float: 1.1,
    boolean: true,
    date: new Date(),
  });

  const snapshot = getSnapshot(m);
  return snapshot;
};

export const createModelWithSnapshotListener = () => {
  const Model = types.model({
    string: types.string,
    number: types.number,
    integer: types.integer,
    float: types.float,
    boolean: types.boolean,
    date: types.Date,
  });

  const m = Model.create({
    string: "string",
    number: 1,
    integer: 1,
    float: 1.1,
    boolean: true,
    date: new Date(),
  });

  onSnapshot(m, (snapshot) => {
    return snapshot;
  });

  return m;
};

export const executeSimpleSnapshotListenerFromAction = () => {
  const Model = types
    .model({
      string: types.string,
      number: types.number,
      integer: types.integer,
      float: types.float,
      boolean: types.boolean,
      date: types.Date,
    })
    .actions((self) => {
      const changeString = (newString) => {
        self.string = newString;
      };

      return {
        changeString,
      };
    });

  const m = Model.create({
    string: "string",
    number: 1,
    integer: 1,
    float: 1.1,
    boolean: true,
    date: new Date(),
  });

  onSnapshot(m, (snapshot) => {
    return snapshot;
  });

  m.changeString("newString");
};

export const applySnapshotToModel = () => {
  const Model = types.model({
    string: types.string,
    number: types.number,
    integer: types.integer,
    float: types.float,
    boolean: types.boolean,
    date: types.Date,
  });

  const m = Model.create({
    string: "string",
    number: 1,
    integer: 1,
    float: 1.1,
    boolean: true,
    date: new Date(),
  });

  const snapshot = getSnapshot(m);
  applySnapshot(m, snapshot);
};

export const applySnapshotToModelWithListener = () => {
  const Model = types.model({
    string: types.string,
    number: types.number,
    integer: types.integer,
    float: types.float,
    boolean: types.boolean,
    date: types.Date,
  });

  const m = Model.create({
    string: "string",
    number: 1,
    integer: 1,
    float: 1.1,
    boolean: true,
    date: new Date(),
  });

  onSnapshot(m, (snapshot) => {
    return snapshot;
  });

  const snapshot = getSnapshot(m);
  applySnapshot(m, snapshot);
};
