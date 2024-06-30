import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NoData from "../NoData";
import Card from "./Card";

export const CONTEXT = {
  STOCK: "stock",
  DECK_NEW: "deck_new",
  DECK_PROFILE: "deck_profile",
  DECK_EDITION: "deck_edition",
};

const CardsList = ({
  cards,
  countTotal,
  filters,
  isFetching,
  onFetchMore,
  context,
  onModifyQuantityCard,
  deck,
  remainingQuantities,
  onUpdateItem,
}) => {
  const [stateRemainingQuantities, setRemainingQuantities] =
    useState(remainingQuantities);

  useEffect(() => {
    const initData = () => {
      setRemainingQuantities(remainingQuantities);
    };
    initData();
  }, [remainingQuantities]);
  const renderCards = () =>
    cards.map((item) => {
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
            onUpdateItem={onUpdateItem}
            remainingQuantity={
              [CONTEXT.DECK_EDITION, CONTEXT.DECK_NEW].includes(context)
                ? stateRemainingQuantities[`${item.chapter}_${item.id}`]
                : null
            }
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

export default CardsList;
