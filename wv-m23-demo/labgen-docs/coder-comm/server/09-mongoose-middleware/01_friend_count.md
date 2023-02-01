## Step 9.1 Update `friendCount` of User

- Edit `models/Friend.js`:

```javascript
---
to: models/Friend.js
inject: true
before: "const Friend"
---
friendSchema.statics.calculateFriendCount = async function (userId) {
  const friendCount = await this.find({
    $or: [{ from: userId }, { to: userId }],
    status: "accepted",
  }).countDocuments();
  await User.findByIdAndUpdate(userId, { friendCount: friendCount });
};

friendSchema.post("save", function () {
  this.constructor.calculateFriendCount(this.from);
  this.constructor.calculateFriendCount(this.to);
});

friendSchema.pre(/^findOneAnd/, async function (next) {
  this.doc = await this.findOne();
  next();
});

friendSchema.post(/^findOneAnd/, async function (next) {
  await this.doc.constructor.calculateFriendCount(this.doc.from);
  await this.doc.constructor.calculateFriendCount(this.doc.to);
});
```
