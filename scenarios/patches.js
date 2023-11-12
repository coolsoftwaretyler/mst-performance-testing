import { types, onPatch, applyPatch } from "mobx-state-tree";

const Model = types.model({
  string: types.string,
  number: types.number,
  integer: types.integer,
  float: types.float,
  boolean: types.boolean,
  date: types.Date,
});

export const attachPatchListenerToModel = () => {
  const m = Model.create({
    string: "string",
    number: 1,
    integer: 1,
    float: 1.1,
    boolean: true,
    date: new Date(),
  });

  onPatch(m, (patch) => {
    return patch;
  });
};

export const executeSimplePatchFromAction = () => {
  const m = Model.create({
    string: "string",
    number: 1,
    integer: 1,
    float: 1.1,
    boolean: true,
    date: new Date(),
  });

  applyPatch(m, {
    op: "replace",
    path: "/string",
    value: "new string",
  });
};
