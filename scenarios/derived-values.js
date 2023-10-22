import { types } from "mobx-state-tree";

const User = types.model({
  id: types.identifier,
  name: types.string,
  age: types.number,
});

const UserStore = types
  .model({
    users: types.array(User),
  })
  .views((self) => ({
    get numberOfChildren() {
      return self.users.filter((user) => user.age < 18).length;
    },
    numberOfPeopleOlderThan(age) {
      return self.users.filter((user) => user.age > age).length;
    },
  }));

const userStore = UserStore.create();

userStore.users.push(User.create({ id: "1", name: "John", age: 42 }));

export const getComputedValueOnce = () => {
  return userStore.numberOfChildren;
};

export const getComputedValueTwice = () => {
  const numberOfChildren = userStore.numberOfChildren;
  const numberOfChildrenAgain = userStore.numberOfChildren;
  return numberOfChildrenAgain;
};

export const getViewWithParameter = () => {
  return userStore.numberOfPeopleOlderThan(50);
};

export const getViewWithParameterTwice = () => {
  const numberOfPeopleOlderThan = userStore.numberOfPeopleOlderThan(50);
  const numberOfPeopleOlderThanAgain = userStore.numberOfPeopleOlderThan(50);
  return numberOfPeopleOlderThanAgain;
};
