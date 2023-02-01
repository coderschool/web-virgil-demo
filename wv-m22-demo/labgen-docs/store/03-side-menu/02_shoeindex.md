## Step 3.2.0 spacer

```javascript
---
to: src/components/Spacer.js
---
import { styled } from "@mui/material/styles";

function getHeight({ axis, size }) {
  return axis === "horizontal" ? 1 : size;
}
function getWidth({ axis, size }) {
  return axis === "vertical" ? 1 : size;
}

const Spacer = styled("span")`
  display: block;
  width: ${getWidth}px;
  min-width: ${getWidth}px;
  height: ${getHeight}px;
  min-height: ${getHeight}px;
`;

export default Spacer;
```

```javascript
---
to: src/components/ShoeIndex.js
---
import React from "react";
import { styled } from "@mui/material/styles";

import { WEIGHTS } from "../constants";

import Breadcrumbs from "./Breadcrumbs";
import ShoeSidebar from "./ShoeSideBar";
import Spacer from "./Spacer";

const ShoeIndex = ({ sortId, setSortId }) => {
  return (
    <Wrapper>
      <MainColumn>

      </MainColumn>
      <LeftColumn>
        <Breadcrumbs>
          <Breadcrumbs.Crumb href="/">Home</Breadcrumbs.Crumb>
          <Breadcrumbs.Crumb href="/sale">Sale</Breadcrumbs.Crumb>
          <Breadcrumbs.Crumb href="/sale/shoes">Shoes</Breadcrumbs.Crumb>
        </Breadcrumbs>
        <Spacer size={42} />
        <ShoeSidebar />
      </LeftColumn>
    </Wrapper>
  );
};

const Wrapper = styled("div")`
  display: flex;
  flex-direction: row-reverse;
  align-items: baseline;
  gap: 32px;
`;

const LeftColumn = styled("div")`
  flex-basis: 248px;
`;

const MainColumn = styled("div")`
  flex: 1;
`;

const Header = styled("header")`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Title = styled("h2")`
  font-size: 1.5rem;
  font-weight: ${WEIGHTS.medium};
`;

export default ShoeIndex;
```
