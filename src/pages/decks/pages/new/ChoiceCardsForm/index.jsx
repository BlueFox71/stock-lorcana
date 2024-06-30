import React from "react";
import { Col, Image, Row } from "antd";
import { getLinkColorImage } from "../../../../../utils/colors";
import { ButtonStyled } from "../../styled";

const ChoiceCardsForm = ({ deck, onCreateDeck }) => {
  const isPhoneFormat = window.innerWidth < 700;

  return (
    <>
      <h1 style={{ fontSize: isPhoneFormat ? "25px" : "50px", color: "black" }}>
        Etape 2 - Choix des cartes
      </h1>
      <Row align={"middle"} justify={"center"} gutter={[10, 10]}>
        <Col>
          {[deck.color1, deck.color2].map((color, index) => (
            <Image
              src={require(`../../../../../assets/colors/${getLinkColorImage(
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
          <ButtonStyled type="primary" onClick={onCreateDeck}>
            Créer le deck
          </ButtonStyled>
        </Col>
        <Col>
          <ButtonStyled>
            {deck.inventoryCountedInDeck
              ? "Le deck est décompté de l'inventaire"
              : "Le deck n'est pas décompté de l'inventaire"}
          </ButtonStyled>
        </Col>
        <Col>
          <ButtonStyled>{deck.countCards}/60 cartes</ButtonStyled>
        </Col>
      </Row>
    </>
  );
};

export default ChoiceCardsForm;
