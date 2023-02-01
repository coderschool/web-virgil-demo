# Design the endpoints

In this step, we are designing REST APIs for our application. The main question is **how to apply REST principles in design process?**

The very first step is identifying the objects which will be presented as resources, which are:

- auth: for authentication process
- post: everything about post (create, read, update, delete)
- friend: actions between 2 users (send friend request, accept/decline, etc.)
- reaction: create emoji reaction to a post or a comment
- comment: CRUD of comments of posts
- users: CRUD of user accounts

Next, it's time to decide the resource URIs which are endpoints of our RESTful services. Think about the relationship between resources and its sub-resources (e.g. Post vs Review, User vs Friendship). Example

```javascript
/**
 * @route POST /auth/login - Log in with username and password
 *
 * @route POST /users - Register a new account
 * @route GET /users?page=1&limit=10 - Get users with pagination
 * @route GET /users/me - Get current user info
 * @route GET /users/:id - Get a user profile
 * @route PUT /users/:id - Update a user profile
 *
 * @route POST /posts - Create a new post
 * @route GET /posts/user/:userId?page=1&limit=10 - Get posts with pagination
 * @route GET /posts/:id - Get details of a post
 * @route PUT /posts/:id - Update a post
 * @route DELETE /posts/:id - Remove a post
 * @route GET /posts/:id/comments/ - Get list of comments of a post
 *
 * @route POST /comments - Create a new comment
 * @route PUT /comments/:id - Update comment
 * @route DELETE /comments/:id - Delete comment
 *
 * @route POST /reactions - Create a new emoji reaction for a post/comment
 *
 * @route POST /friends/requests - Send a friend request
 * @route GET /friends/requests/incoming - Get the list of received pending requests
 * @route GET /friends/requests/outgoing - Get the list of sent pending requests
 * @route PUT /friends/requests/:userId - Accept/Reject a received pending requests
 * @route GET /friends - Get the list of friends
 * @route DELETE /friends/requests/:userId - Cancel a friend request
 * @route DELETE /friends/:userId - Remove a friend
 */
```

Notice: **URIs should be nouns only**, don't use any verb or operation like:

```diff
// don't do this
-@route POST api/posts/create_post - Create a new post
```

**Assign HTTP Methods**: A user can perform browse, create, update, or delete operations. Typically we assign:

- `GET` for browsing
- `POST` for creating
- `PUT` for updating
- `DELETE` for removing

**Authorization**: if there are different roles of users in your system, you should pre-define who can see/do what. Example: we allow everyone to see the list of posts so the endpoint will look like:

```javascript
/**
 * @route GET api/posts?page=1&limit=10
 * @description Get posts with pagination
 * @access Public
 */
```

But if user want to write a post, they need to login, so the endpoint will be defined:

```javascript
/**
 * @route POST api/posts
 * @description Create a new post
 * @access Login required
 */
```

Let's design our endpoints.

## Step 1.0 Create endpoints

- Create `/routes/auth.api.js`:

```javascript
---
to: routes/auth.api.js
---
const express = require("express");
const router = express.Router();

/**
 * @route POST /auth/login
 * @description Log in with username and password
 * @access Public
 */

/**
 * @route POST /auth/login/facebook
 * @description Login with facebook
 * @access Public
 */

/**
 * @route POST /auth/login/google
 * @description Login with google
 * @access Public
 */

module.exports = router;
```

- Create `/routes/user.api.js`:

```javascript
---
to: routes/user.api.js
---
const express = require("express");
const router = express.Router();

/**
 * @route POST /users
 * @description Register new user
 * @access Public
 */

/**
 * @route GET /users/me
 * @description Get current user info
 * @access Login required
 */

/**
 * @route GET /users?page=1&limit=10
 * @description Get users with pagination
 * @access Login required
 */

/**
 * @route GET /users/:id
 * @description Get a user profile
 * @access Login required
 */

/**
 * @route PUT /users/:id
 * @description Update user profile
 * @access Login required
 */

module.exports = router;
```

- Create `/routes/post.api.js`:

```javascript
---
to: routes/post.api.js
---
const express = require("express");
const router = express.Router();

/**
 * @route POST /posts
 * @description Create a new post
 * @access Login required
 */

/**
 * @route GET /posts?page=1&limit=10
 * @description Get all posts an user can see with pagination
 * @access Login required
 */

/**
 * @route GET /posts/:id
 * @description Get a single post
 * @access Login required
 */

/**
 * @route PUT /posts/:id
 * @description Update a post
 * @access Login required
 */

/**
 * @route DELETE /posts/:id
 * @description Delete a post
 * @access Login required
 */

/**
 * @route GET /posts/:id/comments
 * @description Get comments of a post
 * @access Login required
 */

module.exports = router;
```

- Create `/routes/comment.api.js`:

```javascript
---
to: routes/comment.api.js
---
const express = require("express");
const router = express.Router();

/**
 * @route POST /comments
 * @description Create a new comment
 * @access Login required
 */

/**
 * @route GET /comments/:id
 * @description Get details of a comment
 * @access Login required
 */

/**
 * @route PUT /comments/:id
 * @description Update a comment
 * @access Login required
 */

/**
 * @route DELETE /comments/:id
 * @description Delete a comment
 * @access Login required
 */

module.exports = router;
```

- Create `routes/reaction.api.js`:

```javascript
---
to: routes/reaction.api.js
---
const express = require("express");
const router = express.Router();

/**
 * @route POST /reactions
 * @description Create a emoji reaction to a post/comment
 * @access Login required
 */

module.exports = router;
```

- Create `/routes/friend.api.js`:

```javascript
---
to: routes/friend.api.js
---
const express = require("express");
const router = express.Router();

/**
 * @route POST /friends/requests
 * @description Send a friend request
 * @access Login required
 */

/**
 * @route GET /friends/requests
 * @description Get the list of sent and received pending requests
 * @access Login required
 */

/**
 * @route PUT /friends/requests
 * @description Accept/Reject a received pending requests
 * @access Login required
 */

/**
 * @route DELETE /friends/requests/:id
 * @description Cancel a friend request
 * @access Login required
 */

/**
 * @route GET /friends
 * @description Get the list of friends
 * @access Login required
 */

/**
 * @route DELETE /friends/:id
 * @description Remove a friend
 * @access Login required
 */

module.exports = router;
```

- Finally, in `/routes/index.js`:

```javascript
---
to: routes/index.js
---
const express = require("express");
const router = express.Router();

// authApi
const authApi = require("./auth.api");
router.use("/auth", authApi);

// userApi
const userApi = require("./user.api");
router.use("/users", userApi);

// postApi
const postApi = require("./post.api");
router.use("/posts", postApi);

// commentApi
const commentApi = require("./comment.api");
router.use("/comments", commentApi);

// reactionApi
const reactionApi = require("./reaction.api");
router.use("/reactions", reactionApi);

// friendApi
const friendApi = require("./friend.api");
router.use("/friends", friendApi);

module.exports = router;
```

We haven't done any coding task yet, but we have a plan to follow and to measure our process.

When you design your own app, remember that it doesn't need to be perfect. You can come back and modify it later on. However, always start with a plan.
