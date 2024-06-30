import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  FloatButton,
  Modal,
  Row,
  Tooltip,
  notification,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  DeleteFilled,
  ExclamationCircleFilled,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import { getHexaColorByColorInk } from "../../../../utils/colors";
import { deleteDeck, duplicateDeck, fetchDeck } from "../../store/actions";
import NoData from "../../../../shared/NoData";
import { CONTEXT } from "../../../../shared/CardsList";
import CardDeck from "../../../../shared/CardsList/Card";
import { ButtonStyled, DeckContainer, StepCard, StyledMenu, TitleDeck } from "../styled";
import Loader from "../../../../shared/Loader";
import { DECKS, DECK_EDITION, DECK_PROFILE } from "../../../../routes/routes";
import { loadingSelector } from "../../../../reducers/fetchWrapper";
import { FETCH_DECK, ON_DUPLICATE_DECK } from "../../store/constants";
import { DuplicateIcon, EditIcon } from "../../../../styles/icons";
import styled from "styled-components";
import { getCurrentUser } from "../../../../utils/data";
import LogoColorsDouble from "../../components/LogoColorsDouble";

const { confirm } = Modal;

const FloatButtonStyled = styled(FloatButton)`
  && {
    background-color: ${(props) => props.color};
  }
`;

const selector = (state) => ({
  deck: state.deck,
  isLoading: loadingSelector([FETCH_DECK, ON_DUPLICATE_DECK])(state),
});

const DeckProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const iniDataCalled = useRef(false);
  const { deck, isLoading } = useSelector(selector);
  const navigate = useNavigate();

  const handleInitData = () => {
    dispatch(fetchDeck(id));
  };

  useEffect(() => {
    if (!iniDataCalled.current) {
      handleInitData();
      iniDataCalled.current = true;
    }
  }, []);

  const handleEdit = async () => {
    navigate("/" + DECK_EDITION.replace(":id", id));
  };
  const handleDuplicate = async () => {
    const res = await dispatch(duplicateDeck(id));
    dispatch(fetchDeck(res.id));

    notification.success({
      message: "Votre deck a été dupliqué avec succès !",
      placement: "topRight",
    });
    navigate("/" + DECK_PROFILE.replace(":id", res.id));
  };

  const handleDelete = () => {
    dispatch(deleteDeck(id)).then(() => {
      notification.success({
        message: "Suppression effectué avec succès !",
        placement: "topRight",
      });
      navigate("/" + DECKS);
    });
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Confirmez-vous la suppression ?",
      icon: <ExclamationCircleFilled />,
      content: `Si vous confirmez, votre deck '${deck.name}' sera définitivement effacé`,
      okText: "Je confirme",
      okType: "danger",
      centered: true,
      cancelText: "Annuler",
      onOk() {
        handleDelete();
      },
    });
  };

  const showDuplicateConfirm = () => {
    confirm({
      title: "Voulez-vous dupliquer votre deck ?",
      icon: <QuestionCircleOutlined />,
      content: `Votre deck ne sera pas décompté de l'inventaire. Si vous confirmez, vous serez redigéré sur ce nouveau deck.`,
      okText: "Je confirme",
      cancelText: "Annuler",
      centered: true,
      onOk() {
        handleDuplicate();
      },
    });
  };
  return deck.id ? (
    <>
      <DeckContainer>
        <StyledMenu>
          <TitleDeck>Deck n.{deck.id}</TitleDeck>
          <StepCard>
            <Row align={"middle"} justify={"center"} gutter={[10, 10]}>
              <Col xs={7}>
                <LogoColorsDouble deck={deck} />
              </Col>
              <Button>{deck.user}</Button>
              <Col></Col>
              <Col>
                <ButtonStyled>{deck.name}</ButtonStyled>
              </Col>
              <Col>
                <ButtonStyled>
                  {deck.inventoryCountedInDeck
                    ? "Le deck est décompté de l'inventaire"
                    : "Le deck n'est pas décompté de l'inventaire"}
                </ButtonStyled>
              </Col>
              <Col>
                <Button>{deck.countCards}/60 cartes</Button>
              </Col>
            </Row>
          </StepCard>
        </StyledMenu>
        {deck.cards?.length > 0 ? (
          <Row gutter={[0, 10]}>
            {deck.cards.map((item) => (
              <Col
                xs={8}
                sm={12}
                md={8}
                lg={7}
                xl={4}
                style={{ marginTop: "8px", textAlign: "center" }}
              >
                <CardDeck
                  item={item}
                  context={CONTEXT.DECK_PROFILE}
                  deck={deck}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <>{<NoData />}</>
        )}
      </DeckContainer>
      {deck.user === getCurrentUser() && (
        <FloatButton.Group>
          <Tooltip title="Modifier le deck" placement="left">
            <FloatButtonStyled
              color={getHexaColorByColorInk(deck.color1)}
              onClick={handleEdit}
              icon={<EditIcon />}
            />
          </Tooltip>
          <Tooltip title="Dupliquer le deck" placement="left">
            <FloatButtonStyled
              color={getHexaColorByColorInk(deck.color2)}
              onClick={showDuplicateConfirm}
              icon={<DuplicateIcon />}
            />
          </Tooltip>
          <Tooltip title="Supprimer le deck" placement="left">
            <FloatButtonStyled
              color={getHexaColorByColorInk(deck.color1)}
              onClick={showDeleteConfirm}
              icon={<DeleteFilled />}
            />
          </Tooltip>
        </FloatButton.Group>
      )}
    </>
  ) : (
    <Loader isLoading={deck.id !== Number(id) || isLoading} />
  );
};

export default DeckProfile;
