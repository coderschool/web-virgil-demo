## Step 1.0 Reset `src` folder

```bash
---
sh: cd store
change_process_dir: ./store
---
```

```bash
---
sh: rm -R src/
---
```

```bash
---
sh: mkdir src/
---
```

- Create file `src/index.js`:

```javascript
---
to: src/index.js
---

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

- Create file `src/App.js`:

```javascript
---
to: src/App.js
---

import React from "react";
import Typography from '@mui/material/Typography';
import { Box, Link } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.coderschool.vn">
        CoderSchool
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function App() {
  return (
    <>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          My new React app
        </Typography>
        <Copyright />
      </Box>
    </>
  );
}

export default App;
```
