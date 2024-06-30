import React from "react";
import { Col } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { RowStyled, StyledImage } from "./styled";
import { getFileNameCard } from "../../../utils/link";
import { CONTEXT } from "..";
import CustomBadge from "../../../_components/CustomBadge";
import styled from "styled-components";

const ColStyled = styled(Col)`
  && {
    font-size: 25px;
    @media screen and (max-width: 415px) {
      font-size: 20px;
    }
  }
`;

const CardDeck = ({
  item,
  deck,
  onModifyQuantityCard,
  onUpdateItem,
  remainingQuantity,
}) => {
  const quantity = deck.cards.find(
    (card) => card.id === `${item.chapter}_${item.id}`
  )?.quantity;
  const quantityStock = item.quantity;
  const { inventoryCountedInDeck } = deck;
  const handleAdd = () => {
    if (
      quantityStock !== 0 &&
      (!quantity || (quantity < 4 && quantity < quantityStock))
    ) {
      onModifyQuantityCard(item, true);
      if (inventoryCountedInDeck) {
        onUpdateItem({ ...item }, remainingQuantity - 1);
      }
    }
  };
  const handleRemove = () => {
    if (quantity !== undefined && quantity > 0 && quantityStock !== 0) {
      onModifyQuantityCard(item, false);
      if (inventoryCountedInDeck) {
        onUpdateItem({ ...item }, remainingQuantity + 1);
      }
    }
  };

  return (
    <>
      <div style={{ userSelect: "none" }}>
        <CustomBadge count={remainingQuantity}>
          <StyledImage
            alt="dd"
            disabled={!quantity}
            src={require(`../../../assets/cards/${getFileNameCard(item)}`)}
          />
        </CustomBadge>
      </div>
      <RowStyled
        align={"center"}
        disabled={!quantity}
        context={CONTEXT.DECK_NEW}
      >
        <ColStyled span={5}>
          <MinusCircleOutlined onClick={handleRemove} />
        </ColStyled>
        <ColStyled span={5}>
          <span style={{ userSelect: "none" }}>{quantity ?? 0}</span>
        </ColStyled>
        <ColStyled span={5}>
          <PlusCircleOutlined onClick={handleAdd} />
        </ColStyled>
      </RowStyled>
    </>
  );
};

export default CardDeck;
