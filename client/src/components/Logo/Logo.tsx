import * as React from "react";
import styled from "styled-components";

export const Halfway = styled.div`
  font-weight: bold;
  color: rgb(17, 17, 17);
  font-size: 22px;
  font-family: "Helvetica Neue", sans-serif;
`;
export default function Logo() {
  return <Halfway>halfway</Halfway>;
}
