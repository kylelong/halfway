import React from "react";
import styled from "styled-components";
import Logo from "../Logo/Logo";
import {GoogleLogin} from "@react-oauth/google";
import jwt_decode from "jwt-decode";
// import { googleLogout } from '@react-oauth/google';
// googleLogout();

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
    <div>
      <Logo />
      <Container>
        <Header>Welcome back</Header>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const response: any = jwt_decode(
              credentialResponse.credential as string
            );
            console.log(response.email);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </Container>
    </div>
  );
}
