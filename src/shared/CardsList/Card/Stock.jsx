import React from "react";
import { Col, Image } from "antd";
import { RowStyled, StyledImage } from "./styled";
import { getFileNameCard } from "../../../utils/link";
import { CONTEXT } from "..";

const CardStock = ({ item }) => {
  return (
    <>
      <div>
        <StyledImage
          src={require(`../../../assets/cards/${getFileNameCard(item)}`)}
        />
      </div>
      <RowStyled align={"center"} context={CONTEXT.STOCK}>
        <Col>
          <Image
            width={30}
            preview={false}
            src={require(`../../../assets/quantity.png`)}
          />
          {item.quantity}
        </Col>
        <Col>
          <Image
            width={30}
            preview={false}
            src={require(`../../../assets/shiny.png`)}
          />
          {item.countShiny}
        </Col>
      </RowStyled>
    </>
  );
};

export default CardStock;
