# Register user account and validators

## Step 3.0 Generate Token for authenticated user

When someone log in, the system will generate a new access token for that user. We will put the function to generate the token in User model as a instance method.

- Edit `models/User.js`:

```javascript
---
to: models/User.js
inject: true
after: "const Schema"
---
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
```

```javascript
---
to: models/User.js
inject: true
before: "const User"
---
userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.isDeleted;
  return obj;
};

userSchema.methods.generateToken = async function () {
  const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return accessToken;
};
```

We also add `toJSON()` to remove the fields that we don't want to response to the frontend when we need to provide user info.

- Create `controllers/user.controller.js`:

```javascript
---
to: controllers/user.controller.js
---

const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const userController = {};

userController.register = catchAsync(async (req, res, next) => {
  let { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user)
    throw new AppError(409, "User already exists", "Register Error");

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  user = await User.create({
    name,
    email,
    password,
  });
  const accessToken = await user.generateToken();

  return sendResponse(res, 200, true, { user, accessToken }, null, "Create user successful");
});

module.exports = userController;
```

- In `routes/user.api.js`, add:

```javascript
---
to: routes/user.api.js
inject: true
after: "const router"
---
const userController = require("../controllers/user.controller");
```

```javascript
---
to: routes/user.api.js
inject: true
at_line: 10
---
router.post("/", userController.register);
```
