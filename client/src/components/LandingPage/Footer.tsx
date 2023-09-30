import * as React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import Logo from "../Logo/Logo";

export const FooterDiv = styled.footer`
  display: flex;
  -webkit-box-pack: justify;
  flex-direction: column;
  border-top: 1px solid rgba(55, 53, 47, 0.09);
  margin-top: 32px;
  padding: 25px 0px;
  @media (min-width: 769px) {
    padding: 50px 0px;
  }
  width: 100%;
`;
export default function Footer() {
  return (
    <FooterDiv>
      <Logo />
      <p>
        &copy; Halfway
        {new Date().getFullYear()}
      </p>
      <Link
        to="/pricing"
        style={{
          textDecoration: "none",
          color: "rgb(68, 68, 68)",
          marginBottom: "6px",
        }}
      >
        Pricing
      </Link>
      <span>contact@halfway.so</span>
    </FooterDiv>
  );
}
