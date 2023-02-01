## Step 2.2 Add Header to App.js

```javascript
---
to: src/App.js
inject: true
remove_lines:
  from: "<Typography variant=\"h4\""
  to: 3
---
```

```javascript
---
to: src/App.js
inject: true
after: "import { Box, Link }"
---

import Header from "./components/Header";
import GlobalStyles from "./components/GlobalStyles";
import { styled } from "@mui/material/styles";
```

```javascript
---
to: src/App.js
inject: true
after: <>
---
<GlobalStyles />
<Header />
```
