## Step 2.1 Create Comment Model

- Create `models/Comment.js`:

```javascript
---
to: models/Comment.js
---
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema(
  {
    content: { type: String, required: true },
    author: { type: Schema.ObjectId, required: true, ref: "User" },
    post: { type: Schema.ObjectId, required: true, ref: "Blog" },
    reactions: {
      like: { type: Number, default: 0 },
      dislike: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
```
