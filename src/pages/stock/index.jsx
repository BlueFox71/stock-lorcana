import React, { useEffect } from "react";
import { Row, Col, FloatButton } from "antd";
import Card from "./components/Card";
import styled from "styled-components";
import ButtonBack from "../../_components/ButtonBack";
import Filters from "./containers/Filters";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards, fetchCardsMore } from "./store/actions";
import { loadingSelector } from "../../reducers/fetchWrapper";
import { FETCH_CARDS, SET_FILTERS } from "./store/constants";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../shared/Loader";
import NoData from "../../shared/NoData";

const selector = (state) => ({
  cards: state.cards.items,
  countTotal: state.cards.total,
  isFetching: loadingSelector([FETCH_CARDS])(state),
  filters: state.filtersCard,
});

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

const Stock = () => {
  const { cards, countTotal, isFetching, filters } = useSelector(selector);

  const dispatch = useDispatch();

  useEffect(() => {
    const initData = async () => {
      await dispatch(fetchCards({ limit: 18, offset: 0 }));
    };
    initData();
  }, [dispatch]);

  const handleFetchMore = async () => {
    console.log("ici")
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

  const renderCards = () =>
    cards.map((item) => (
      <Col xs={8} sm={12} md={8} lg={7} xl={4}>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <Card item={item} />
        </div>
      </Col>
    ));

    return (
    <>
      <Loader isLoading={isFetching} />
      <h1 style={{ marginTop: "80px" }}>Inventaire Lorcana</h1>
      <Container>
        <Filters cards={cards} total={countTotal} />
        {cards?.length > 0 ? (
          <Row gutter={[0, 10]}>
            {countTotal > 17 ? (
              <InfiniteScroll
                dataLength={cards.length} //This is important field to render the next data
                next={handleFetchMore}
                hasMore={filters.hasMore}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                }}
              >
                {renderCards()}
              </InfiniteScroll>
            ) : (
              renderCards()
            )}
          </Row>
        ) : (
          <>{!isFetching && <NoData />}</>
        )}
        <ButtonBack />
      </Container>
      <FloatButton.BackTop style={{ bottom: 100 }} />
    </>
  );
};

export default Stock;
