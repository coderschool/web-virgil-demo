# Design database schema

In this step, we work on Mongoose schemas and middlewares. It's worth to think about it seriously because the database is the core of your platform.

Let's start with the user model first.

## Step 2.0 Create User Model

- Create `models/User.js`:

```javascript
---
to: models/User.js
---
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatarUrl: { type: String, require: false, default: "" },
    password: { type: String, required: true, select: false },
    friendCount: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamps: true }
);

userSchema.plugin(require("./plugins/isDeletedFalse"));

const User = mongoose.model("User", userSchema);
module.exports = User;
```

You can see that we have `isDeleted` flag which has a boolean value. The idea is we will not permanently delete an user. Deleting an user is turning the `isDeleted` value to `true`. It's quite common to keep the "important" data like this example.

Then to respond user list requests, we only return users with `isDeleted` is `false`. To automate that we integrate a mongoose plugin:

- Create `models/plugins/isDeletedFalse.js`:

```javascript
---
to: models/plugins/isDeletedFalse.js
---
module.exports = exports = isDeletedFalse = function (schema, options) {
  schema.pre(/^find/, function (next) {
    if (this._conditions["isDeleted"] === undefined)
      this._conditions["isDeleted"] = false;
    next();
  });
};
```
