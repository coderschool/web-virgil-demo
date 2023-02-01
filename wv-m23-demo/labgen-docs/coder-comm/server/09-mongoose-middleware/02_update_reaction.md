## Step 9.1 Update emoji reactions of Post or Comment

- Edit `models/Reaction.js`:

```javascript
---
to: models/Reaction.js
inject: true
before: "const Reaction"
---
reactionSchema.statics.calculateReaction = async function (
  targetId,
  targetType
) {
  const stats = await this.aggregate([
    {
      $match: { targetId },
    },
    {
      $group: {
        _id: "$targetId",
        like: {
          $sum: {
            $cond: [{ $eq: ["$emoji", "like"] }, 1, 0],
          },
        },
        dislike: {
          $sum: {
            $cond: [{ $eq: ["$emoji", "dislike"] }, 1, 0],
          },
        },
      },
    },
  ]);
  await mongoose.model(targetType).findByIdAndUpdate(targetId, {
    reactions: {
      like: (stats[0] && stats[0].like) || 0,
      dislike: (stats[0] && stats[0].dislike) || 0,
    },
  });
};

reactionSchema.post("save", async function () {
  // this point to current review
  await this.constructor.calculateReaction(this.targetId, this.targetType);
});

reactionSchema.pre(/^findOneAnd/, async function (next) {
  this.doc = await this.findOne();
  next();
});

reactionSchema.post(/^findOneAnd/, async function (next) {
  await this.doc.constructor.calculateReaction(
    this.doc.targetId,
    this.doc.targetType
  );
});
```
