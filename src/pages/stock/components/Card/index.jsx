import React from "react";
import PropTypes from "prop-types";
import { Col, Image, Row } from "antd";
import { styled } from "styled-components";

const StyledImage = styled(Image)`
  && {
    width: 200px;
    box-shadow: 1px 1px 10px grey;
    border-radius: 12px;
    background-color: black;
    @media screen and (max-width: 415px) {
      width: 100px;
      border-radius: 5px;
      box-shadow: inherit;
    }
  }
`;

const RowStyled = styled(Row)`
  && {
    background-color: #09143f;
    border: solid white 1px;
    color: white;
    width: 200px;
    margin: 20px auto;
    border-radius: 10px;
    @media screen and (max-width: 415px) {
      width: 100px;
      padding: 0;
      margin: 5px auto;
      border: none;
    }
  }
`;

const Card = ({ item }) => {
  const getFileNameCard = () => {
    let name = `chapter_${item.chapter}_`;
    if (item.id < 10) {
      name = name.concat("0");
    }
    if (item.id < 100) {
      name = name.concat("0");
    }
    name = name.concat(item.id?.toString());
    name = name.concat(".png");
    return name;
  };

  return (
    <>
      <div>
        <StyledImage
          src={require(`../../../../assets/cards/${getFileNameCard()}`)}
        />
      </div>
      <RowStyled align={"center"}>
        <Col>
          <Image
            width={30}
            preview={false}
            src={require(`../../../../assets/quantity.png`)}
          />
          {item.quantity}
        </Col>
        <Col>
          <Image
            width={30}
            preview={false}
            src={require(`../../../../assets/shiny.png`)}
          />
          {item.countShiny}
        </Col>
      </RowStyled>
    </>
  );
};

Card.propTypes = {
  item: PropTypes.shape(),
};

export default Card;
