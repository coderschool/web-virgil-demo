## Step 2.1 Create Friend Model

- Create `models/Friend.js`:

```javascript
---
to: models/Friend.js
---

const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;

const friendSchema = Schema(
  {
    from: { type: Schema.ObjectId, required: true, ref: "User" },
    to: { type: Schema.ObjectId, required: true, ref: "User" },
    message: {type: String},
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
    },
  },
  { timestamps: true }
);

const Friend = mongoose.model("Friend", friendSchema);
module.exports = Friend;
```
