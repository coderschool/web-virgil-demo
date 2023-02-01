## Step 3.1 User Validation

For safety reason, on the server side we should have data validation. Here we use the library [express-validator](https://express-validator.github.io/docs/).

It's will be a bit confused but the good news is you can reuse this code in any other projects.

- Create `middlewares/validators.js`:

```javascript
---
to: middlewares/validators.js
---
const { sendResponse } = require("../helpers/utils");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const validators = {};

validators.validate = (validationArray) => async (req, res, next) => {
  await Promise.all(validationArray.map((validation) => validation.run(req)));
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const message = errors
    .array()
    .map((error) => error.msg)
    .join(" & ");
  return sendResponse(res, 422, false, null, { message }, "Validation Error");
};

validators.checkObjectId = (paramId) => {
  if (!mongoose.Types.ObjectId.isValid(paramId)) {
    throw new Error("Invalid ObjectId");
  }
  return true;
};

module.exports = validators;
```

- Edit `routes/user.api.js`:

```javascript
---
to: routes/user.api.js
inject: true
after: "const userController"
---
const validators = require("../middlewares/validators");
const { body } = require("express-validator");
```

```javascript
---
to: routes/user.api.js
inject: true
after: router\.post
---
router.post(
  "/",
  validators.validate([
    body("name", "Invalid name").exists().notEmpty(),
    body("email", "Invalid email").exists().isEmail(),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  userController.register
);
```

```javascript
---
to: routes/user.api.js
inject: true
remove_lines:
  from: router\.post
  to: 1
---
-router.post("/", userController.register);
```
