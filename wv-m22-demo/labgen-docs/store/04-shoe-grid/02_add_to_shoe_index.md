## Step 4.2 Add to ShoeIndex.js

````javascript
---
to: src/components/ShoeIndex.js
inject: true
after: "import Spacer"
---
import Select from "./Select";
import ShoeGrid from "./ShoeGrid";
```ex

```javascript
---
to: src/components/ShoeIndex.js
inject: true
after: <MainColumn>
---
<Header>
  <Title>Running</Title>
  <Select
    label="Sort"
    value={sortId}
    onChange={(ev) => setSortId(ev.target.value)}
  >
    <option value="newest">Newest Releases</option>
    <option value="price">Price</option>
  </Select>
</Header>
<Spacer size={34} />
<ShoeGrid />
````
