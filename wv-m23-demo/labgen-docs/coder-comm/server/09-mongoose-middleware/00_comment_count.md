# Adding Mongoose middlewares

In this step, we will add mongoose middlewares into the schemas to automate some common tasks. Example: when you create a new comment to a post, you want to increase the `commentCount` in the `post` collection by 1.

## Step 9.0 Update `commentCount` of Post

- Edit `models/Comment.js`:

```javascript
---
to: models/Comment.js
inject: true
after: "const mongoose"
---
const Post = require("./Post");
```

```javascript
---
to: models/Comment.js
inject: true
before: "const Comment"
---

commentSchema.statics.calculateReviews = async function (postId) {
  const commentCount = await this.find({ post: postId }).countDocuments();
  await Post.findByIdAndUpdate(postId, { commentCount: commentCount });
};

commentSchema.post("save", async function () {
  await this.constructor.calculateReviews(this.post);
});

// Neither findByIdAndUpdate nor findByIdAndDelete have access to document middleware.
// They only get access to query middleware
// Inside this hook, this will point to the current query, not the current comment.
// Therefore, to access the comment, we’ll need to execute the query
commentSchema.pre(/^findOneAnd/, async function (next) {
  this.doc = await this.findOne();
  next();
});

commentSchema.post(/^findOneAnd/, async function (next) {
  await this.doc.constructor.calculateReviews(this.doc.post);
});
```
