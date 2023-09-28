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

export const GetStarted = styled.button`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  max-width: 200px;
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

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 32px;
`;
export const Section = styled.div`
  & > div:first-child {
    flex: 0.5 1 0%;
  }
`;

export const SectionHeader = styled.h2`
  display: flex;
  font-family: "Helvetica Neue", sans-serif;
  text-align: left;
  font-weight: bold;
  font-size: 20px;
  color: rgb(0, 0, 0);
  margin-bottom: 12px;
  @media (min-width: 569px) {
    font-size: 36px;
  }
`;
export const SectionText = styled.p`
  text-align: left;
  font-size: 16px;
  line-height: 1.25;
  font-weight: 500;
  color: #374151;
  @media (min-width: 569px) {
    font-size: 22px;
  }
`;

export const SectionTextSmallWidth = styled(SectionText)`
  max-width: 412px;
  width: 100%;
  //500px for medium text
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
          Get started for free{" "}
          <img alt="arrow right" src={arrowRight} style={svgStyle} />{" "}
        </GetStarted>
        <NoSignUp>No sign up required</NoSignUp>

        <Details>
          <Section>
            <SectionHeader>
              AI powered content tailored for all your writing needs
            </SectionHeader>
            <SectionText>
              Whether if you are getting started or need some direction while
              creating content &#8212; <br />
              we help you get from the{" "}
              <span style={{color: "rgb(93, 93, 255)", fontWeight: "bold"}}>
                halfway
              </span>{" "}
              point to across the finish line.
            </SectionText>
          </Section>
          <Section>
            <SectionHeader>Content for various reasons</SectionHeader>
            <SectionTextSmallWidth>
              Our smart features powered by AI makes it easy to turn your ideas
              into effective content for every need.
            </SectionTextSmallWidth>
          </Section>
          <Section>
            <SectionHeader>Writing of all forms</SectionHeader>
            <SectionTextSmallWidth>
              Your one stop shop for various mediums.
            </SectionTextSmallWidth>
          </Section>

          <Section>
            <SectionHeader>Share your voice</SectionHeader>
            <SectionTextSmallWidth>
              Content that sounds like you with the option to edit using our
              rich text editor until you are satisfied.
            </SectionTextSmallWidth>
          </Section>
        </Details>
      </Container>
    </div>
  );
}

export default LandingPage;
