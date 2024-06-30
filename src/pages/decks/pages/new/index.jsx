import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CardsList, { CONTEXT } from "../../../../shared/CardsList";
import { useDispatch, useSelector } from "react-redux";
import {
  createDeck,
  fetchCardsForDecks,
  fetchCardsForDecksMore,
} from "../../store/actions";
import { loadingSelector } from "../../../../reducers/fetchWrapper";
import { FETCH_CARDS_FOR_DECKS } from "../../store/constants";
import { SET_FILTERS } from "../../../stock/store/constants";
import Filters from "../../../stock/containers/Filters";
import DeckConfigurationForm from "./DeckConfigurationForm";
import ChoiceCardsForm from "./ChoiceCardsForm";
import { getCurrentUser } from "../../../../utils/data";
import { getModifiedCards } from "../../store/utils";
import { DeckContainer, StepCard, TitleDeck } from "../styled";
import { DECK_PROFILE } from "../../../../routes/routes";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

export const STEPS = {
  CONFIGURATION: "CONFIGURATION",
  CHOICE_OF_CARDS: "CHOICE_OF_CARDS",
};

const StyledMenu = styled.div`
  && {
    background-color: #292a47;
    top: 0;
    z-index: 100;
    width: 70%;
    border-bottom: ${({ step }) =>
      step === STEPS.CHOICE_OF_CARDS ? "thick double white" : "none"};
    position: fixed;
    @media screen and (max-width: 415px) {
      width: 340px;
    }
  }
`;

const selector = (state) => ({
  cards: state.cards.items,
  countTotal: state.cards.total,
  filters: state.filtersCard,
  isFetching: loadingSelector([FETCH_CARDS_FOR_DECKS])(state),
  remainingQuantities: state.remainingQuantities.items,
});

const DeckNewForm = () => {
  const { cards, countTotal, filters, isFetching, remainingQuantities } =
    useSelector(selector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [stateRemainingQuantities, setRemainingQuantities] =
    useState(remainingQuantities);
  const [step, setStep] = useState(STEPS.CONFIGURATION);
  const [deck, setDeck] = useState({
    user: getCurrentUser(),
    color1: null,
    color2: null,
    name: null,
    inventoryCountedInDeck: false,
    cards: [],
    countCards: 0,
  });

  useEffect(() => {
    setRemainingQuantities(remainingQuantities);
  }, [remainingQuantities]);

  const handleCreateDeck = () => {
    dispatch(createDeck(deck)).then((res) => {
      notification.success({
        message: `Enregistrement effectuée`,
        description: "Votre deck a été créée avec succès",
        placement: "topRight",
      });
      
      navigate("/" + DECK_PROFILE.replace(':id', res.id));
    });
  };

  const handleFetchCards = (filters) => {
    dispatch(fetchCardsForDecks(filters));
  };

  const handleFetchMore = () => {
    const { limit, offset } = filters;
    dispatch(
      fetchCardsForDecksMore({ ...filters, limit, offset: offset + limit })
    );

    dispatch({
      type: SET_FILTERS,
      payload: {
        ...filters,
        limit,
        offset: offset + limit,
        hasMore: countTotal > offset || countTotal > offset + limit,
      },
    });
  };

  const handleModifyQuantityCard = (item, isAdding = false) =>
    setDeck(getModifiedCards(item, isAdding, deck));

  const handleUpdateItem = (item, newQuantity) => {
    const quantities = { ...remainingQuantities };
    quantities[`${item.chapter}_${item.id}`] = newQuantity;
    setRemainingQuantities(quantities);
  };

  const handleChangeIventoryCountedInDeck = (value) => {
    let quantities = { ...stateRemainingQuantities };
    if (!value) {
      deck.cards.forEach(
        (card) => (quantities[card.id] = quantities[card.id] + card.quantity)
      );
    } else {
      deck.cards.forEach(
        (card) => (quantities[card.id] = quantities[card.id] - card.quantity)
      );
    }
    setRemainingQuantities(quantities);
  };

  return (
    <DeckContainer new={"350"}>
      <StyledMenu step={step}>
        <TitleDeck>Création du deck</TitleDeck>
        <StepCard>
          {STEPS.CONFIGURATION === step && (
            <DeckConfigurationForm
              deck={deck}
              setDeck={setDeck}
              setStep={setStep}
              onFetchCards={handleFetchCards}
            />
          )}
          {STEPS.CHOICE_OF_CARDS === step && (
            <ChoiceCardsForm
              deck={deck}
              onCreateDeck={handleCreateDeck}
              handleChangeIventoryCountedInDeck={
                handleChangeIventoryCountedInDeck
              }
            />
          )}
        </StepCard>
      </StyledMenu>
      {STEPS.CHOICE_OF_CARDS === step && (
        <>
          <Filters total={countTotal} context={CONTEXT.DECK_NEW} />
          <CardsList
            cards={cards}
            countTotal={countTotal}
            filters={filters}
            isFetching={isFetching}
            onFetchMore={handleFetchMore}
            context={CONTEXT.DECK_NEW}
            onModifyQuantityCard={handleModifyQuantityCard}
            deck={deck}
            remainingQuantities={stateRemainingQuantities}
            onUpdateItem={handleUpdateItem}
          />
        </>
      )}
    </DeckContainer>
  );
};

export default DeckNewForm;
