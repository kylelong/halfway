import React from "react";
import styled from "styled-components";
import Logo from "../Logo/Logo";
import {Link} from "react-router-dom";
import {linkStyle} from "../../styles/common";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const NavButton = styled.button`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  max-width: 100%;
  height: 28px;
  padding: 0px 8px;
  border: 0px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  outline: none;
  white-space: nowrap;
  transition: color 100ms ease-in 0s;
  text-align: left;
  color: rgb(119, 118, 114);
  background-color: transparent;
  margin-right: 22px;
  &:hover {
    color: rgb(114, 113, 109);
    background-color: rgb(238, 242, 255);
  }
`;
const PricingButton = styled(NavButton)`
  display: none;
  @media (min-width: 768px) {
    display: inline-flex;
  }
`;
export const CreateButton = styled.button`
  display: none;
  @media (min-width: 768px) {
    display: inline-flex;
  }
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  max-width: 100%;
  height: 28px;
  padding: 0px 8px;
  border: 0px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  outline: none;
  white-space: nowrap;
  transition: color 100ms ease-in 0s;
  text-align: left;
  color: white;
  background-color: rgb(93, 93, 255);
  &:hover {
    opacity: 0.8;
  }
`;

export const NavigationMenu = styled.div`
  display: flex;
  @media (max-width: 568px) {
    position: relative;
    left: 32px;
  }
`;

const Menu = () => {
  return (
    <Container>
      <Logo />

      <NavigationMenu>
        <Link to="/pricing" style={linkStyle}>
          <PricingButton>Pricing</PricingButton>
        </Link>

        <Link to="/about" style={linkStyle}>
          <PricingButton>About</PricingButton>
        </Link>

        <Link to="/" style={linkStyle}>
          <CreateButton>Create content</CreateButton>
        </Link>
      </NavigationMenu>
    </Container>
  );
};

export default Menu;
