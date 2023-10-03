import React from "react";
import {Link} from "react-router-dom";
import WordSwitcher from "../WordSwitcher";
import styled from "styled-components";
import Menu from "../Menu/Menu";
import arrowRight from "../../assets/arrowRight.svg";
import youtube from "../../assets/youtube.svg";
import facebook from "../../assets/facebook.svg";
import linkedin from "../../assets/linkedin.svg";
import tiktok from "../../assets/tiktok.svg";
import gmail from "../../assets/gmail.svg";
import instagram from "../../assets/instagram.svg";
import twitter from "../../assets/twitter.svg";
import paper from "../../assets/paper.svg";
import chart from "../../assets/chart.svg";
import email from "../../assets/email.svg";
import person from "../../assets/person.svg";
import seo from "../../assets/seo.svg";
import cart from "../../assets/cart.svg";
import smiling from "../../assets/smiling.svg";
import laughing from "../../assets/laughing.svg";
import love from "../../assets/in-love.svg";
import thinking from "../../assets/thinking.svg";
import sunglasses from "../../assets/sunglasses.svg";
import writing from "../../assets/writing.svg";
import Footer from "./Footer";
import {
  svgStyle,
  svgContentStyle,
  svgMediaStyle,
  emojiStyle,
  linkStyle,
} from "../../styles/common";

const svgs = [paper, chart, email, person, seo, cart];
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0px 32px;
  @media (min-width: 1024px) {
    flex: 1 1 0%;
    margin: 0px auto;
    width: 1024px;
    padding: 0px 24px;
  }
`;
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
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
export const Section = styled.div``;

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
export const SectionHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 769px) {
    flex-direction: row;
  }
`;
export const EmojiContainer = styled.div`
  @media (min-width: 769px) {
    position: relative;
    top: 38px;
    left: 15px;
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
export const UpsellText = styled.p`
  text-align: left;
  font-size: 17px;
  line-height: 1.25;
  color: #374151;
  max-width: 550px;
  width: 100%;
  @media (min-width: 569px) {
    font-size: 22px;
  }
`;

export const SectionTextSmallWidth = styled(SectionText)`
  max-width: 430px;
  width: 100%;
  //500px for medium text
`;

export const SectionTextLargeWidth = styled(SectionText)`
  width: 100%;
  max-width: 900px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px; /* Optional: defines the space between grid items */
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 1px 0px,
    rgba(61, 59, 53, 0.16) 0px 0px 0px 1px,
    rgba(61, 59, 53, 0.08) 0px 3px 9px 0px,
    rgba(61, 59, 53, 0.08) 0px 2px 5px 0px;
  border-radius: 10px;
  background: rgb(254, 254, 254);
  padding: 12px;
  @media (min-width: 769px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
export const GridItem = styled.div`
  padding: 10px 20px 0px 20px;
`;
export const GridHeader = styled.h3`
  font-size: 18px;
  margin: 0px 0px 8px;
  font-weight: 800;
  color: rgb(0, 0, 0);
`;
export const Dot = styled.div`
  width: 5px;
  height: 5px;
  background-color: rgb(93, 93, 255);
  border-radius: 50%;
  position: relative;
  top: 7px;
`;
export const GridItemContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
export const GridDescription = styled.div`
  margin-bottom: 6px;
  margin-left: 5px;
`;

export const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 10px; /* Optional: defines the space between grid items */
  position: relative;
  right: 34px;
  // box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 1px 0px,
  //   rgba(61, 59, 53, 0.16) 0px 0px 0px 1px,
  //   rgba(61, 59, 53, 0.08) 0px 3px 9px 0px,
  //   rgba(61, 59, 53, 0.08) 0px 2px 5px 0px;
  border-radius: 10px;
  background: rgb(254, 254, 254);
  padding: 12px;
  @media (min-width: 769px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const MediaGridItem = styled.div`
  padding: 10px 20px 0px 20px;
  display: flex;
  flex-direction: column;
`;

export const MediaLabel = styled.div`
  color: rgb(55, 53, 47);
  font-weight: 600;
`;
export const MediaDescription = styled.div`
  color: rgb(119, 118, 114);
  font-weight: 500;
  margin-top: 3px;
`;

//#endregion
const useCases = {
  Writing: [
    "Overcome writer’s block",
    "Smart paragraphs and sentences",
    "Spelling and grammar checker",
  ],
  Marketing: [
    "Enhance your brand",
    "Increase revenue and user activity",
    "Content tailored for your audience",
  ],
  Email: [
    "Optimize communication",
    "Effective marketing campaigns",
    "Smart subjects and messages",
  ],
  Advertising: [
    "Create impactful advertisements",
    "Captivate your target audience",
    "Increase brand awareness",
  ],
  SEO: [
    "Effective keywords that convert",
    "Improve search engine rankings",
    "Increase traffic to your business",
  ],
  "E-commerce": [
    "Enhance product listings",
    "Compelling product details",
    "SEO-friendly content",
  ],
};

const social = {
  blog: {
    label: "Blog / Paper",
    svg: paper,
    description: "Ideas that effectively convey your message",
  },
  twitter: {
    label: "Twitter",
    svg: twitter,
    description: "Generate engaging threads, tweets, and replies",
  },
  youtube: {
    label: "Youtube",
    svg: youtube,
    description: "Captivating video ideas, titles, and subtitles",
  },
  linkedin: {
    label: "Linkedin",
    svg: linkedin,
    description:
      "Engaging posts, comments, and hashtags to connect with your professional network",
  },
  facebook: {
    label: "Facebook",
    svg: facebook,
    description: "Posts and ads that captivate your audience.",
  },
  tiktok: {
    label: "Tiktok",
    svg: tiktok,
    description: "Viral video ideas, titles, and captions, and hashtags.",
  },
  instagram: {
    label: "Instagram",
    svg: instagram,
    description: "Expressive ads, captions, reel ideas, bios, and hashtags",
  },
  gmail: {
    label: "Email",
    svg: gmail,
    description:
      "Craft clear and relevant responses for all conversation types.",
  },
};

function About() {
  return (
    <div className="py-5 px-6">
      <Menu />
      <Container>
        <HeaderContainer>
          <Sentence>
            Smart content for <WordSwitcher /> in seconds
          </Sentence>
          <SubText>The best way to generate content.</SubText>
        </HeaderContainer>
        <Link to="/" style={linkStyle}>
          <GetStarted>
            Get started for free{" "}
            <img alt="arrow right" src={arrowRight} style={svgStyle} />{" "}
          </GetStarted>
        </Link>
        <NoSignUp>No sign up required</NoSignUp>

        <Details>
          <div className="mb-6">
            <SectionHeader>
              AI powered content tailored for all your writing needs
            </SectionHeader>
            <SectionTextLargeWidth>
              Whether if you are getting started or need some direction while
              creating content &#8212; <br />
              we help you get from the{" "}
              <span style={{color: "rgb(93, 93, 255)", fontWeight: "bold"}}>
                halfway
              </span>{" "}
              point to across the finish line.
            </SectionTextLargeWidth>
          </div>

          <div className="mb-12">
            <SectionHeader>Content for all purposes</SectionHeader>
            <SectionTextSmallWidth>
              Our smart features powered by AI makes it easy to turn your ideas
              into effective content for every need.
            </SectionTextSmallWidth>
            <div className="mt-6 pl-2 grid grid-cols-1 md:grid-cols-3 gap-8 rounded-xl border-slate-100 border-2 shadow-md shadow-slate-50 pb-3">
              {Object.entries(useCases).map((item, idx) => {
                return (
                  <div className="pt-3 pr-6 pb-0 pl-3" key={idx}>
                    <div className="flex flex-row mb-3">
                      <img
                        alt="paper"
                        src={svgs[idx]}
                        style={svgContentStyle}
                      />
                      <span className="mt-3 ml-0.5">{item[0]}</span>
                    </div>
                    <div>
                      {item[1].map((e, idx) => {
                        return (
                          <div
                            className="flex flex-row flex-wrap items-center"
                            key={idx}
                          >
                            <div className="w-1.5 h-1.5 bg-violet-500 rounded-full"></div>
                            <div className="relative left-2">{e}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-6">
            <SectionHeader>Writing of all forms</SectionHeader>
            <SectionTextSmallWidth>
              Your one stop shop for various mediums.
            </SectionTextSmallWidth>
            <MediaGrid>
              {Object.entries(social).map(([key, value]) => {
                return (
                  <MediaGridItem key={key}>
                    <img
                      alt={value.label}
                      src={value.svg}
                      style={svgMediaStyle}
                    />
                    <MediaLabel>{value.label}</MediaLabel>
                    <MediaDescription>{value.description}</MediaDescription>
                  </MediaGridItem>
                );
              })}
            </MediaGrid>
          </div>

          <Section>
            <SectionHeaderContainer>
              <SectionHeader>Maintain your voice </SectionHeader>
              <div className="flex flex-row mb-4 md:mb-2">
                <img alt="smiling" src={smiling} style={emojiStyle} />{" "}
                <img alt="laughing" src={laughing} style={emojiStyle} />{" "}
                <img alt="thinking" src={thinking} style={emojiStyle} />{" "}
                <img alt="love" src={love} style={emojiStyle} />{" "}
                <img alt="sunglasses" src={sunglasses} style={emojiStyle} />{" "}
              </div>
            </SectionHeaderContainer>
            <SectionTextSmallWidth>
              Content that sounds like you with the option to edit using our
              <i style={{color: "rgb(93, 93, 255)", fontWeight: "bold"}}>
                {" "}
                rich text editor{" "}
              </i>{" "}
              until you are satisfied.
            </SectionTextSmallWidth>
            <div className="max-w-xl text-lg mt-3 text-slate-600">
              Choose which tone of voice your content is generated in. Whether
              that be humorous, professional, casual, persuasive, etc. Whichever
              tone suits your needs, you have options.
            </div>
          </Section>
          <Section>
            <img
              alt="writing"
              src={writing}
              style={{maxWidth: "650px", width: "100%"}}
            />
            <SectionHeader>It's time to enhance your writing</SectionHeader>
            <div className="mb-6 max-w-lg text-lg lg:text-xl text-slate-600">
              Starting out or{" "}
              <span style={{color: "rgb(93, 93, 255)", fontWeight: "bold"}}>
                halfway
              </span>{" "}
              there with your writing? Cross the finish line with amazing
              content today. No account needed to try it out.
            </div>
            <Link to="/" style={linkStyle}>
              <GetStarted>
                Get started for free{" "}
                <img alt="arrow right" src={arrowRight} style={svgStyle} />{" "}
              </GetStarted>
            </Link>
          </Section>
          <Footer />
        </Details>
      </Container>
    </div>
  );
}

export default About;
