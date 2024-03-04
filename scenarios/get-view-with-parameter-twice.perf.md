---
title: "Get a view with a parameter twice (should not be cached)"
---

```js
import { types } from "mobx-state-tree";
k;
```

```js
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

const userStore = UserStore.create({
  users: [
    { id: "1", name: "John", age: 42 },
    { id: "2", name: "Jane", age: 47 },
  ],
});

const numberOfPeopleOlderThan = userStore.numberOfPeopleOlderThan(50);
const numberOfPeopleOlderThanAgain = userStore.numberOfPeopleOlderThan(50);
return numberOfPeopleOlderThanAgain;
```