import React from "react";
import styled from "styled-components";
import Menu from "../../components/Menu/Menu";
import checkBadge from "../../assets/checkBadge.svg";
import {svgStyle} from "../../styles/common";
import Footer from "../LandingPage/Footer";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 89%;
  padding: 0px 32px;
  min-height: 100vh;
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
    font-size: 3rem;
  }
`;

export const Message = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: rgb(68, 68, 68);
  text-align: center;
  @media (min-width: 769px) {
    font-size: 20px;
  }
`;

export const Subscribe = styled.button`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  max-width: 200px;
  margin: 0 auto;
  width: 100%;
  border: 0px;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  white-space: nowrap;
  transition: color 100ms ease-in 0s;
  text-align: left;
  color: rgb(255, 255, 255);
  background: rgb(93, 93, 255);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 1px 0px,
    rgba(0, 112, 215, 0.16) 0px 0px 0px 1px,
    rgba(0, 112, 215, 0.08) 0px 2px 5px 0px;
  height: 45px;
  padding: 0px 14px;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    opacity: 0.9;
  }
  position: relative;
  right: 25px;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 6px;
`;

export const Description = styled.div`
  color: rgb(55, 65, 81);
  font-size: inherit;
  font-weight: inherit;
  font-weight: 600;
  font-size: 16px;
  margin-left: 6px;
`;
export const PerkContainer = styled.div`
  margin-right: 22px;
  margin-bottom: 18px;
`;
export const Content = styled.div`
  position: relative;
  bottom: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 769px) {
    bottom: 85px;
  }
`;
const perks = [
  "Content for all your needs",
  "Access to GPT-3.5",
  "20,000 words / month",
  "Several templates",
  "Rich text editor",
];
export default function Pricing() {
  return (
    <div>
      <Menu />
      <Container>
        <Header>Pricing</Header>
        <Content>
          <Message>
            Try for{" "}
            <span style={{color: "rgb(93, 93, 255)", fontWeight: "bold"}}>
              free
            </span>{" "}
            first but unlock its full potential when you are ready. <br />{" "}
            Upgrade for{" "}
            <span style={{color: "rgb(93, 93, 255)", fontWeight: "bold"}}>
              $19 / month
            </span>
          </Message>
          <br />
          <PerkContainer>
            {perks.map((item, i) => {
              return (
                <Item key={i}>
                  <img alt="checkBadge" src={checkBadge} style={svgStyle} />
                  <Description>{item}</Description>
                </Item>
              );
            })}
          </PerkContainer>
          <Subscribe>Subscribe</Subscribe>
        </Content>

        <Footer />
      </Container>
    </div>
  );
}
