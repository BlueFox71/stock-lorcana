import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NoData from "../NoData";
import Card from "./Card";

export const CONTEXT = {
  STOCK: "stock",
  DECKS: "decks",
  DECK_PROFILE: "deck_profile",
  DECK_EDITION: "deck_edition",
};

const StockList = ({
  cards,
  countTotal,
  filters,
  isFetching,
  onFetchMore,
  context,
  onModifyQuantityCard,
  deck,
  remainingQuantities,
}) => {
  const [stateRemainingQuantities, setRemainingQuantities] =
    useState(remainingQuantities);

  const handleUpdateItem = (item, newQuantity) => {
    const quantities = { ...remainingQuantities };
    quantities[`${item.chapter}_${item.id}`] = newQuantity;
    setRemainingQuantities(quantities);
  };

  useEffect(() => {
    setRemainingQuantities(remainingQuantities);
  }, []);

  const renderCards = () =>
    cards.map((item) => {
      const remainingQuantity =
        stateRemainingQuantities[`${item.chapter}_${item.id}`];
      return (
        <Col
          xs={8}
          sm={12}
          md={8}
          lg={7}
          xl={4}
          style={{ marginTop: "8px", textAlign: "center" }}
        >
          <Card
            item={item}
            context={context}
            deck={deck}
            onModifyQuantityCard={onModifyQuantityCard}
            onUpdateItem={handleUpdateItem}
            remainingQuantity={remainingQuantity}
          />
        </Col>
      );
    });

  return (
    <>
      {cards?.length > 0 ? (
        <Row gutter={[0, 10]}>
          {countTotal > 17 ? (
            <InfiniteScroll
              dataLength={cards.length}
              next={onFetchMore}
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
    </>
  );
};

export default StockList;
