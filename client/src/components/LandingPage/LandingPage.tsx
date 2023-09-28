import React from "react";
import WordSwitcher from "../WordSwitcher";
import styled from "styled-components";
import Menu from "../Menu/Menu";
import arrowRight from "../../assets/arrowRight.svg";
import {svgStyle} from "../../styles/common";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0px;
`;
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
  @media (min-width: 768px) {
    margin-bottom: 64px;
  }
`;
export const Sentence = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  text-align: center;
  font-weight: bold;
  font-size: 26px;
  color: rgb(17, 17, 17);
  @media (min-width: 568px) {
    font-size: 42px;
  }
`;

export const SubText = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  display: flex;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: -1px;
  color: #94a3b8;
  @media (min-width: 568px) {
    font-size: 32px;
  }
`;

export const GetStarted = styled.div`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  max-width: 100%;
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
  height: 36px;
  padding: 0px 14px;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    opacity: 0.9;
  }
`;
export const NoSignUp = styled.div`
  margin-top: 10px;
  color: rgb(69, 67, 62);
  font-size: 13px;
  text-align: center;
  font-weight: bold;
`;

export const SectionHeader = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  text-align: center;
  font-weight: bold;
  font-size: 36px;
  color: rgb(17, 17, 17);
`;

function LandingPage() {
  return (
    <div>
      <Menu />
      <Container>
        <HeaderContainer>
          <Sentence>
            Smart content for <WordSwitcher /> in seconds
          </Sentence>
          <SubText>The best way to generate content.</SubText>
        </HeaderContainer>
        <GetStarted>
          Get started for free <img src={arrowRight} style={svgStyle} />{" "}
        </GetStarted>
        <NoSignUp>No sign up required</NoSignUp>
        <SectionHeader>
          AI powered content tailored for all your writing needs
        </SectionHeader>

        <div>
          Whether if you are getting started or need some direction while
          creating content, we are here help you get from the <b>halfway</b>{" "}
          point to across the finish line.
        </div>

        <SectionHeader>Helping you create the content needed to:</SectionHeader>
      </Container>
    </div>
  );
}

export default LandingPage;
