## Step 0.0 Setup with express-generator

- Create new project

```bash
---
sh: mkdir cc-server && cd cc-server
change_process_dir: ./cc-server
---
```

```bash
---
sh: npx express-generator --no-view --git && npm install
---
```

```bash
---
sh: git init
---
```

- Install `nodemon` to keep tracking your changes and automatically restart server:

```bash
---
sh: npm install --save-dev nodemon
---
```

Open `package.json`, add `"dev": "nodemon ./bin/www"` to `"scripts: {..}"`

```javascript
---
to: package.json
inject: true
after: scripts
skip_if: dev\"
---
"dev": "nodemon ./bin/www",
```

- Install dependencies:

```bash
---
sh: npm i dotenv cors mongoose jsonwebtoken bcryptjs express-validator
---
```

- Remove everything in `public/`

```bash
---
sh: rm -R ./public && mkdir public
---
```

- Create `\.env`:

```javascript
---
to: .env
---
PORT=5000
MONGODB_URI='mongodb://localhost:27017/coder_comm'
JWT_SECRET_KEY="any_secret_key"
```

- In `/routes/index.js`, replace `res.render('index', { title: 'Express' });` with `res.send({ status: "ok", data: "Hello World!" });`

```javascript
---
to: routes/index.js
---
const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ status: "ok", data: "Hello World!" });
});

module.exports = router;
```

- In `routes/`, delete `users.js`:

```bash
---
sh: rm routes/users.js
---
```

- Edit `app.js`:

```javascript
---
to: app.js
---
const express = require("express");
require("dotenv").config();

const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI;

const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);

/* DB Connection */
mongoose
  .connect(mongoURI)
  .then(() => console.log(`DB connected`))
  .catch((err) => console.log(err));

module.exports = app;
```

### Evaluation

- Test the app: `npm run dev`, then open `localhost:5000/api` on the browser. You should see `{"status":"ok","data":"Hello World!"}` on the screen.

```

```
