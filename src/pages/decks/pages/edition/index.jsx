import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Image, Input, Row } from "antd";
import {
  fetchCardsForDecks,
  fetchCardsForDecksMore,
  fetchDeck,
  fetchRemainingQuantities,
  updateDeck,
} from "../../store/actions";
import { loadingSelector } from "../../../../reducers/fetchWrapper";
import {
  FETCH_CARDS_FOR_DECKS,
  FETCH_DECK,
  FETCH_REMAINING_QUANTITIES,
} from "../../store/constants";
import { SET_COLORS, SET_FILTERS } from "../../../stock/store/constants";
import { getLinkColorImage } from "../../../../utils/colors";
import CardsList, { CONTEXT } from "../../../../shared/CardsList";
import Filters from "../../../stock/containers/Filters";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../.././../../shared/Loader";
import { ButtonStyled, DeckContainer, StepCard, StyledMenu, TitleDeck } from "../styled";
import { DECK_PROFILE } from "../../../../routes/routes";

const selector = (state) => ({
  cards: state.cards.items,
  countTotal: state.cards.total,
  filters: state.filtersCard,
  isFetching: loadingSelector([
    FETCH_CARDS_FOR_DECKS,
    FETCH_REMAINING_QUANTITIES,
    FETCH_DECK,
  ])(state),
  remainingQuantities: state.remainingQuantities.items,
  originalDeck: state.deck,
});

const DeckEditionForm = () => {
  const {
    originalDeck,
    cards,
    countTotal,
    filters,
    isFetching,
    remainingQuantities,
  } = useSelector(selector);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const iniDataCalled = useRef(false);
  const [deck, setDeck] = useState(originalDeck);
  const [stateRemainingQuantities, setRemainingQuantities] =
    useState(remainingQuantities);

  const handleInitData = async () => {
    const colors = [originalDeck.color1, originalDeck.color2];
    Promise.all([
      dispatch(fetchDeck(id)),
      dispatch({ type: SET_COLORS, payload: colors }),
      dispatch(fetchRemainingQuantities({ colors: colors })),
      dispatch(fetchCardsForDecks({ ...filters, colors })),
    ]);
  };

  useEffect(() => {
    if (!iniDataCalled.current) {
      handleInitData();
      iniDataCalled.current = true;
    }
  }, []);

  useEffect(() => {
    setRemainingQuantities(remainingQuantities);
  }, [remainingQuantities]);

  const handleFetchMore = async () => {
    const { limit, offset } = filters;
    await dispatch(
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

  const handleModifyQuantityCard = (item, isAdding = false) => {
    const { cards } = deck;
    let newCards = [...cards];
    let countCards = deck.countCards;

    if (!cards.find((i) => i.id === `${item.chapter}_${item.id}`)) {
      if (isAdding) {
        const card = {
          id: `${item.chapter}_${item.id}`,
          quantity: 1,
        };
        newCards.push(card);
        countCards++;
      } else {
        return;
      }
    } else {
      newCards = newCards.map((c) => {
        if (c.id === `${item.chapter}_${item.id}`) {
          if (isAdding) {
            c.quantity++;
            countCards++;
          } else {
            c.quantity--;
            countCards--;
          }
        }
        return c;
      });
    }

    setDeck({ ...deck, countCards, cards: newCards });
  };

  const handleUpdateDeck = () => {
    const sortedCards = deck.cards
      .filter((card) => card.quantity > 0)
      .sort((a, b) => {
        const [chapterA, idA] = a.id.split("_").map(Number);
        const [chapterB, idB] = b.id.split("_").map(Number);

        if (chapterA !== chapterB) {
          return chapterA - chapterB;
        }
        return idA - idB;
      });
    dispatch(updateDeck(id, { ...deck, cards: sortedCards })).then(() =>
      navigate("/" + DECK_PROFILE.replace(":id", id))
    );
  };

  const handleUpdateItem = (item, newQuantity) => {
    const quantities = { ...remainingQuantities };
    quantities[`${item.chapter}_${item.id}`] = newQuantity;
    setRemainingQuantities(quantities);
  };

  const handleChange = (name, value) => {
    setDeck({ ...deck, [name]: value });
    if (name === "inventoryCountedInDeck") {
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
    }
  };

  return deck.id ? (
    <DeckContainer>
      <StyledMenu>
        <TitleDeck>
          Deck n.{deck.id} de {deck.user}
        </TitleDeck>
        <StepCard>
          <Row align={"middle"} justify={"center"} gutter={[10, 10]}>
            <Col>
              {[deck.color1, deck.color2].map((color, index) => (
                <Image
                  src={require(`../../../../assets/colors/${getLinkColorImage(
                    color
                  )}`)}
                  alt={color}
                  preview={false}
                  style={{
                    clipPath:
                      index === 0
                        ? "polygon(0 0, 50% 0, 50% 100%, 0 100%)"
                        : "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
                    width: "50px",
                    height: "50px",
                    marginLeft: index === 0 ? "0" : "-50px",
                    padding: "0",
                  }}
                />
              ))}
            </Col>
            <Col>
              <Button type="primary" onClick={handleUpdateDeck}>
                Enregistrer
              </Button>
            </Col>
            <Col>
              <Input
                value={deck.name}
                onChange={(e) => handleChange("name", e.target.value)}
              ></Input>
            </Col>
            <Col>
              <ButtonStyled
                onClick={() =>
                  handleChange(
                    "inventoryCountedInDeck",
                    !deck.inventoryCountedInDeck
                  )
                }
              >
                {deck.inventoryCountedInDeck
                  ? "Le deck est décompté de l'inventaire"
                  : "Le deck n'est pas décompté de l'inventaire"}
              </ButtonStyled>
            </Col>
            <Col>
              <ButtonStyled>{deck.countCards}/60 cartes</ButtonStyled>
            </Col>
          </Row>
        </StepCard>
      </StyledMenu>
      <>
        <Filters total={countTotal} context={CONTEXT.DECK_NEW} />
        <CardsList
          cards={cards}
          countTotal={countTotal}
          filters={filters}
          isFetching={isFetching}
          onFetchMore={handleFetchMore}
          context={CONTEXT.DECK_EDITION}
          onModifyQuantityCard={handleModifyQuantityCard}
          deck={deck}
          remainingQuantities={stateRemainingQuantities}
          onUpdateItem={handleUpdateItem}
        />
      </>
    </DeckContainer>
  ) : (
    <Loader isLoading={isFetching} />
  );
};

export default DeckEditionForm;
