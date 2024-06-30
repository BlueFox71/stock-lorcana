import { Image, Row } from "antd";
import styled from "styled-components";
import { CONTEXT } from "..";

export const StyledImage = styled(Image)`
  && {
    width: 200px;
    box-shadow: 1px 1px 10px grey;
    border-radius: 12px;
    background-color: black;
    filter: ${(props) => (props.disabled ? "grayscale(65%)" : "none")};
    @media screen and (max-width: 415px) {
      width: 100px;
      border-radius: 5px;
      box-shadow: inherit;
    }
  }
`;

export const RowStyled = styled(Row)`
  && {
    background-color: ${({ context }) =>
      CONTEXT.STOCK === context ? "#09143f" : "#652b23"};
    border: solid white 1px;
    color: white;
    width: 200px;
    margin: 12px auto 20px;
    border-radius: 10px;
    filter: ${(props) => (props.disabled ? "grayscale(60%)" : "none")};
    @media screen and (max-width: 415px) {
      width: 100px;
      padding: 0;
      margin: 5px auto;
      border: none;
    }
  }
`;
