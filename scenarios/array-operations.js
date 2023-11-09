import { types } from "mobx-state-tree";

const SampleModel = types.model({
  name: types.string,
  id: types.string,
});

const SampleStore = types
  .model({
    items: types.array(SampleModel),
  })
  .actions((self) => ({
    add(name, id) {
      self.items.push({ name, id });
    },
  }));

/**
 * Requested by the community in https://github.com/coolsoftwaretyler/mst-performance-testing/issues/26
 */
export const addNObjectsToArray = (n) => {
  const store = SampleStore.create({ items: [] });
  for (let i = 0; i < n; i++) {
    store.add(`item-${i}`, `id-${i}`);
  }
};
