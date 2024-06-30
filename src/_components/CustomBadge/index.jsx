import React from "react";
import styled from "styled-components";

const StyledBadge = styled.div`
  && {
    background: black;
    border: #fbe9cb solid 3px;
    font-weight: 400;
    color: #fbe9cb;
    width: 30px;
    height: 30px;
    padding-top: 10px;
    position: absolute;
    right: 25px;
    border-radius: 5px;
    top: -3px;
    z-index: 50;
    font-size: 20px;
    @media screen and (max-width: 415px) {
      width: 20px;
      border-width: 1px;
      font-size: 15px;
      right: 15px;
      height: 25px;
    }
  }
`;

const CustomBadge = ({ count, children }) => (
  <>
    <StyledBadge>{count}</StyledBadge>
    {children}
  </>
);

export default CustomBadge;
