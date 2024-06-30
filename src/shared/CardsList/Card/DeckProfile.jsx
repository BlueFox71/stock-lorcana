import React from "react";
import { StyledImage } from "./styled";
import { getFileNameCardDeck } from "../../../utils/link";
import CustomBadge from "../../../_components/CustomBadge";

const CardDeckProfile = ({ item }) => {
  return (
    <div style={{ userSelect: "none" }}>
      <CustomBadge count={item.quantity}>
        <StyledImage
          alt="dd"
          src={require(`../../../assets/cards/${getFileNameCardDeck(item.id)}`)}
        />
      </CustomBadge>
    </div>
  );
};

export default CardDeckProfile;
