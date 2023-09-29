import * as React from "react";
import styled from "styled-components";
import lifeBuoy from "../../assets/lifeBuoy.svg";
import {svgStyle} from "../../styles/common";

export const Halfway = styled.div`
  font-weight: bold;
  color: rgb(17, 17, 17);
  font-size: 22px;
  font-family: "Helvetica Neue", sans-serif;
`;
export const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
export default function Logo() {
  return (
    <LogoContainer>
      <Halfway>halfway</Halfway>
      <img src={lifeBuoy} alt="buoy" style={svgStyle} />
    </LogoContainer>
  );
}
