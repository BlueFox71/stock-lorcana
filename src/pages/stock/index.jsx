import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Filters from "./containers/Filters";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards, fetchCardsMore } from "./store/actions";
import { loadingSelector } from "../../reducers/fetchWrapper";
import { FETCH_CARDS, SET_FILTERS } from "./store/constants";
import Loader from "../../shared/Loader";
import CardsList, { CONTEXT } from "../../shared/CardsList";

const Container = styled.div`
  && {
    width: 70%;
    margin: 0 auto;
    padding: 50px 0;
    @media screen and (max-width: 415px) {
      width: 340px;
    }
  }
`;

const selector = (state) => ({
  cards: state.cards.items,
  countTotal: state.cards.total,
  isFetching: loadingSelector([FETCH_CARDS])(state),
  filters: state.filtersCard,
});

const Stock = () => {
  const dispatch = useDispatch();
  const iniDataCalled = useRef(false);
  const { cards, countTotal, isFetching, filters } = useSelector(selector);

  const handleInitData = () => {
    dispatch(fetchCards({ limit: 18, offset: 0 }));
  };

  useEffect(() => {
    if (!iniDataCalled.current) {
      handleInitData();
      iniDataCalled.current = true;
    }
  }, []);

  const handleFetchMore = async () => {
    const { limit, offset } = filters;
    await dispatch(
      fetchCardsMore({ ...filters, limit, offset: offset + limit })
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

  return (
    <>
      <Loader isLoading={isFetching} />
      <h1 style={{ marginTop: "80px" }}>Inventaire Lorcana</h1>
      <Container>
        <Filters total={countTotal} context={CONTEXT.STOCK} />
        <CardsList
          cards={cards}
          countTotal={countTotal}
          filters={filters}
          isFetching={isFetching}
          onFetchMore={handleFetchMore}
          context={CONTEXT.STOCK}
        />
      </Container>
    </>
  );
};

export default Stock;
