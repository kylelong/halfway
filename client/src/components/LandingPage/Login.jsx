import React from "react";
import styled from "styled-components";
import Logo from "../Logo/Logo";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 32px;
  @media (min-width: 1024px) {
    flex: 1 1 0%;
    margin: 0px auto;
    width: 1024px;
    padding: 0px 24px;
  }
`;
export const Header = styled.h1`
  font-family: "Helvetica Neue", sans-serif;
  text-align: center;
  font-weight: bold;
  font-size: 32px;
  color: rgb(55, 65, 81);
  @media (min-width: 648px) {
    font-size: 2.5rem;
  }
`;

export default function Login() {
  return (
    <div className="py-5 px-6">
      <Logo />
      <Container>
        <Header>Welcome back</Header>
      </Container>
    </div>
  );
}
