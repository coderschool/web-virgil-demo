# Header

## Step 2.1.0 SuperHeader

```javascript
---
to: src/components/SuperHeader.js
---
import React from "react";
import { styled } from "@mui/material/styles";

import { COLORS } from "../constants";

import SearchInput from "./SearchInput";
import UnstyledButton from "./UnstyledButton";
import Icon from "./Icon";

const SuperHeader = () => {
  return (
    <Wrapper>
      <MarketingMessage>
        Free shipping on domestic orders over $75!
      </MarketingMessage>
      <SearchInput />
      <HelpLink href="/help">Help</HelpLink>
      <UnstyledButton>
        <Icon id="shopping-bag" strokeWidth={1} />
      </UnstyledButton>
    </Wrapper>
  );
};

const Wrapper = styled("div")`
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 0.875rem;
  color: ${COLORS.gray[300]};
  background-color: ${COLORS.gray[900]};
  height: 40px;
  padding-left: 32px;
  padding-right: 32px;
`;

const MarketingMessage = styled("span")`
  color: ${COLORS.white};
  margin-right: auto;
`;

const HelpLink = styled("a")`
  color: inherit;
  text-decoration: none;
  outline-offset: 2px;
  &:not(:focus-visible) {
    outline: none;
  }
`;

export default SuperHeader;
```

```javascript
---
to: src/components/Icon.js
---
import React from "react";
import { styled } from "@mui/material/styles";
import { Search, Menu, ShoppingBag, ChevronDown } from "react-feather";

const icons = {
  search: Search,
  menu: Menu,
  "shopping-bag": ShoppingBag,
  "chevron-down": ChevronDown,
};

const Icon = ({ id, color, size, strokeWidth, ...delegated }) => {
  const Component = icons[id];

  if (!Component) {
    throw new Error(`No icon found for ID: ${id}`);
  }

  return (
    <Wrapper strokeWidth={strokeWidth} {...delegated}>
      <Component color={color} size={size} />
    </Wrapper>
  );
};

const Wrapper = styled("div")`
  & > svg {
    display: block;
    stroke-width: ${(p) => p.strokeWidth}px;
  }
`;

export default Icon;
```

```javascript
---
to: src/components/SearchInput.js
---
import React from "react";
import { styled } from "@mui/material/styles";

import { COLORS } from "../constants";
import VisuallyHidden from "./VisuallyHidden";
import Icon from "./Icon";

const SearchInput = ({ label, ...delegated }) => {
  return (
    <Label>
      <VisuallyHidden>Search</VisuallyHidden>
      <Input {...delegated} placeholder="Search…" />
      <SearchIcon id="search" strokeWidth={1} size={16} />
    </Label>
  );
};

const Label = styled("label")`
  position: relative;
`;

const Input = styled("input")`
  border: none;
  background: transparent;
  border-bottom: 1px solid ${COLORS.gray[300]};
  padding-left: 24px;
  font-size: 0.875rem;
  color: ${COLORS.gray[100]};
  outline-offset: 4px;

  &::placeholder {
    color: ${COLORS.gray[500]};
  }
`;

const SearchIcon = styled(Icon)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  width: 16px;
  height: 16px;
`;

export default SearchInput;
```

```javascript
---
to: src/components/UnstyledButton.js
---
import { styled } from "@mui/material/styles";

export default styled("button")`
  display: ${(props) => props.display || "block"};
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;

  &:focus {
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`;
```

```javascript
---
to: src/components/VisuallyHidden.js
---
import React from "react";
import { styled } from "@mui/material/styles";

const VisuallyHidden = ({ children, ...delegated }) => {
  const [forceShow, setForceShow] = React.useState(false);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const handleKeyDown = (ev) => {
        if (ev.key === "Alt") {
          setForceShow(true);
        }
      };

      const handleKeyUp = () => {
        setForceShow(false);
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keydown", handleKeyUp);
      };
    }
  }, []);

  if (forceShow) {
    return children;
  }

  return <Wrapper {...delegated}>{children}</Wrapper>;
};

const Wrapper = styled("div")`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`;

export default VisuallyHidden;
```

## Step 2.1.1 Header

```javascript
---
to: src/components/Header.js
---
import React from "react";
import { styled } from "@mui/material/styles";

import { COLORS, WEIGHTS } from "../constants";
import Logo from "./Logo";
import SuperHeader from "./SuperHeader";

const Header = () => {
  // Our site features two visual headers, but they should be
  // grouped semantically as a single header.
  return (
    <header>
      <SuperHeader />
      <MainHeader>
        <Side>
          <Logo />
        </Side>
        <Nav>
          <NavLink href="/sale">Sale</NavLink>
          <NavLink href="/new">New&nbsp;Releases</NavLink>
          <NavLink href="/men">Men</NavLink>
          <NavLink href="/women">Women</NavLink>
          <NavLink href="/kids">Kids</NavLink>
          <NavLink href="/collections">Collections</NavLink>
        </Nav>
        <Side />
      </MainHeader>
    </header>
  );
};

const MainHeader = styled("div")`
  display: flex;
  align-items: baseline;
  padding: 18px 32px;
  height: 72px;
  border-bottom: 1px solid ${COLORS.gray[300]};
`;

const Nav = styled("nav")`
  display: flex;
  gap: 48px;
  margin: 0px 48px;
`;

const Side = styled("div")`
  flex: 1;
`;

const NavLink = styled("a")`
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: ${COLORS.gray[900]};
  font-weight: ${WEIGHTS.medium};
  &:first-of-type {
    color: ${COLORS.secondary};
  }
`;

export default Header;
```

```javascript
---
to: src/components/Logo.js
---
import React from "react";
import { styled } from "@mui/material/styles";

import { WEIGHTS } from "../constants";

const Logo = (props) => {
  return (
    <Link href="/">
      <Wrapper {...props}>CS Store</Wrapper>
    </Link>
  );
};

const Link = styled("a")`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled("h1")`
  font-size: 1.5rem;
  font-weight: ${WEIGHTS.bold};
`;

export default Logo;
```
