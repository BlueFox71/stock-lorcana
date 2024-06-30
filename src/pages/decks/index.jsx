import React, { useEffect, useRef } from "react";
import { Button, Col, Divider, FloatButton, List, Row } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../shared/Loader";
import { fetchDecks } from "./store/actions";
import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { getRgbColorByColorInk } from "../../utils/colors";
import { Link } from "react-router-dom";
import { loadingSelector } from "../../reducers/fetchWrapper";
import { FETCH_CARDS_FOR_DECKS, ON_CREATE_DECK } from "./store/constants";

const { Item } = List;

const MainContainer = styled.div`
  && {
    width: 600px;
    margin: 0 auto;
    padding: 50px 0;
    @media screen and (max-width: 415px) {
      width: 340px;
      padding: 50px 0;
    }
  }
`;

const StyledListItem = styled(Item)`
  && {
    margin: 15px 0px;
    border-radius: 20px;
    transition: all 10s ease-out;
    border: 2px solid black;
    height: auto;
    width: 600px;
    font-size: 25px;
    background-color: ${({ item }) => getRgbColorByColorInk(item.color1)};
    box-shadow: 350px 0 100px -100px ${({ item }) =>
        getRgbColorByColorInk(item.color2)} inset;
    transition: all 1s;
    @media screen and (max-width: 415px) {
      width: 340px;
    }
  }

  &&:hover {
    background-color: ${({ item }) => getRgbColorByColorInk(item.color2)};
    box-shadow: 350px 0 100px -100px ${({ item }) =>
        getRgbColorByColorInk(item.color1)} inset;
    border: 2px solid white;
  }
`;

const ButtonCreate = styled(Button)`
  && {
    height: auto;
    width: 600px;
    font-size: 25px;
    @media screen and (max-width: 415px) {
      width: 340px;
    }
  }
`;

const selector = (state) => ({
  decks: state.decks.items,
  isLoading: loadingSelector([FETCH_CARDS_FOR_DECKS, ON_CREATE_DECK])(state),
});

const Decks = () => {
  const dispatch = useDispatch();
  const iniDataCalled = useRef(false);
  const { decks, isLoading } = useSelector(selector);

  const handleInitData = () => dispatch(fetchDecks());

  useEffect(() => {
    if (!iniDataCalled.current) {
      handleInitData();
      iniDataCalled.current = true;
    }
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />
      <h1 style={{ marginTop: "80px" }}>Decks</h1>
      <MainContainer>
        <Link to={"./new"}>
          <ButtonCreate type="primary" icon={<PlusCircleOutlined />}>
            Créer un deck
          </ButtonCreate>
        </Link>
        <Divider />
        <List
          bordered
          dataSource={decks}
          style={{ border: "none" }}
          renderItem={(item) => (
            <Link to={`./profile/${item.id}`}>
              <StyledListItem item={item}>
                <Row style={{ width: "100%" }} justify={"start"}>
                  <Col span={12}>
                    <div style={{ fontSize: "20px", fontWeight: 600 }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: "20px" }}>
                      {!item.inventoryCountedInDeck && <CloseCircleOutlined />}
                    </div>
                  </Col>
                  <Col
                    span={12}
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      textAlign: "end",
                    }}
                  >
                    <div>{item.user}</div>
                    <div style={{ fontSize: "15px" }}>
                      {item.countCards}/60 cartes
                    </div>
                  </Col>
                </Row>
              </StyledListItem>
            </Link>
          )}
        />
      </MainContainer>
      <FloatButton.BackTop style={{ bottom: 100 }} />
    </>
  );
};

export default Decks;
