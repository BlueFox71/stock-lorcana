import React from "react";
import CardStock from "./Stock";
import CardDeck from "./Deck";

import { CONTEXT } from "..";
import CardDeckProfile from "./DeckProfile";

const Card = (props) => {
  if (props.context === CONTEXT.STOCK) {
    return <CardStock {...props} />;
  }
  if (props.context === CONTEXT.DECK_PROFILE) {
    return <CardDeckProfile {...props} />;
  }
  if ([CONTEXT.DECK_NEW, CONTEXT.DECK_EDITION].includes(props.context)) {
    return <CardDeck {...props} />;
  }
};

export default Card;
