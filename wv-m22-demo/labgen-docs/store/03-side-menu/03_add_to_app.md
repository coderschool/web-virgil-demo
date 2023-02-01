## Step 3.3 Add shoe index to App.js

```javascript
---
to: src/App.js
inject: true
after: "import { styled }"
---
import ShoeIndex from "./components/ShoeIndex";
```

```javascript
---
to: src/App.js
inject: true
after: "function App"
---
const [sortId, setSortId] = React.useState("newest");
```

```javascript
---
to: src/App.js
inject: true
after: <Header />
---
<Main>
  <ShoeIndex sortId={sortId} setSortId={setSortId} />
</Main>
```

```javascript
---
to: src/App.js
inject: true
before: "export default App;"
---
const Main = styled("main")`
  padding: 64px 32px;
`;
```
