import { Button, Card } from "antd";
import styled from "styled-components";

export const DeckContainer = styled.div`
  && {
    width: 70%;
    margin: 0 auto;
    padding-top: ${(props) => (props.new ? props.new : "250")}px;
    padding-bottom: 20px;
    @media screen and (max-width: 415px) {
      width: 340px;
      padding-top: 350px;
    }
  }
`;

export const StepCard = styled(Card)`
  && {
    margin: 0px auto 20px;
    width: 80%;
    position: static;
    background: #fbe9cb;
    border: none;
    @media screen and (max-width: 415px) {
      font-size: 150px;
    }
  }
`;

export const StyledMenu = styled.div`
  && {
    background-color: #292a47;
    top: 0;
    z-index: 100;
    width: 70%;
    border-bottom: thick double white;
    position: fixed;
    @media screen and (max-width: 415px) {
      width: 340px;
    }
  }
`;

export const ButtonStyled = styled(Button)`
  && {
    white-space: normal !important;
    word-break: break-word !important;
    text-align: center;
    height: auto;
    width: 100%;
  }
`;

export const TitleDeck = styled.h1`
  && {
    @media screen and (max-width: 415px) {
      font-size: 45px;
    }
  }
`;
