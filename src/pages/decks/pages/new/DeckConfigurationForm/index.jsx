import { Card, Checkbox, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import CheckboxWithImage from "../../../../stock/components/CheckBoxWithImage";
import styled from "styled-components";
import { STEPS } from "..";
import { useDispatch } from "react-redux";
import { SET_COLORS } from "../../../../stock/store/constants";
import { fetchRemainingQuantities } from "../../../store/actions";
import { ButtonStyled } from "../../styled";

const NameStyled = styled(Card)`
  && {
    min-height: 90px;
    font-size: 25px;
    text-align: center;
    padding: 0;
    background: white;
    @media screen and (max-width: 415px) {
      font-size: 25px;
    }
  }
`;

const DeckConfigurationForm = ({ deck, setDeck, setStep, onFetchCards }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [colors, setColors] = useState([]);
  const [inventoryCountedInDeck, setInventoryCountedInDeck] = useState(false);
  const isPhoneFormat = window.innerWidth < 700;

  const colorsOptions = [
    { value: "Ambre", src: "colors/amber.webp" },
    { value: "Améthyste", src: "colors/amethyst.webp" },
    { value: "Émeraude", src: "colors/emerald.webp" },
    { value: "Rubis", src: "colors/ruby.webp" },
    { value: "Saphir", src: "colors/sapphire.webp" },
    { value: "Acier", src: "colors/steel.png" },
  ];

  const handleSelectColor = (values) => {
    if (values.length < 3) {
      setColors(values);
    }
  };

  const renderColors = () => {
    if (colors.length === 0) {
      return;
    }
    if (colors.length === 1) {
      return colors[0];
    }
    if (colors.length === 2) {
      return colors[0] + " - " + colors[1];
    }
  };

  const handleConfigure = (values) => {
    setDeck({
      ...deck,
      ...values,
      inventoryCountedInDeck: inventoryCountedInDeck,
      color1: colors[0],
      color2: colors[1],
    });
    setStep(STEPS.CHOICE_OF_CARDS);
    dispatch({ type: SET_COLORS, payload: colors });
    dispatch(fetchRemainingQuantities({ colors }));
    onFetchCards({
      limit: 18,
      offset: 0,
      colors,
    });
  };

  return (
    <Form
      form={form}
      name="colors"
      onFinish={handleConfigure}
      initialValues={{
        user: deck.user,
      }}
    >
      <h1 style={{ fontSize: isPhoneFormat ? "25px" : "50px", color: "black" }}>
        Etape 1 - Configuration
      </h1>
      <Row align={"middle"} justify={"center"}>
        <Col xl={6} xs={18}>
          <Form.Item
            name="colors"
            rules={[
              {
                required: true,
                message: "Veuillez choisir 2 couleurs",
                validator: (_, value) => {
                  if (!value || value.length !== 2) {
                    return Promise.reject();
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Checkbox.Group
              className="checkbox-color"
              value={colors}
              onChange={(value) => handleSelectColor(value)}
            >
              {colorsOptions.map((option) => (
                <CheckboxWithImage
                  className="checkbox-color"
                  key={option.value}
                  value={option.value}
                  imageSrc={option.src}
                  imageSize={isPhoneFormat ? 40 : 70}
                />
              ))}
            </Checkbox.Group>
          </Form.Item>
        </Col>
        <Col xs={18} xl={10} offset={isPhoneFormat ? 0 : 2}>
          <NameStyled>{renderColors()}</NameStyled>
          <Form.Item
            name="name"
            style={{ marginTop: "10px" }}
            label="Nom du deck"
            rules={[
              {
                required: true,
                message: "Veuillez saisir un nom",
              },
            ]}
          >
            <Input placeholder="Nom du deck"></Input>
          </Form.Item>
          <Form.Item name="user" label="Ce deck appartient à ">
            <Input disabled></Input>
          </Form.Item>
        </Col>
      </Row>
      <Row
        style={{ marginTop: "30px" }}
        justify={"space-around"}
        align={"bottom"}
      >
        <Col xs={24} xl={8}>
          <Form.Item
            name="inventoryCountedInDeck"
            valuePropName="checked"
            initialValue={false}
          >
            <ButtonStyled
              onClick={() => setInventoryCountedInDeck(!inventoryCountedInDeck)}
            >
              {inventoryCountedInDeck
                ? "Le deck sera décompté de l'inventaire"
                : "Le deck ne sera pas décompté de l'inventaire"}
            </ButtonStyled>
          </Form.Item>
        </Col>
        <Col xl={4} xs={16}>
          <ButtonStyled
            htmlType="submit"
            style={{ height: "45px", margin: "10px" }}
            type="primary"
          >
            Choisir les cartes
          </ButtonStyled>
        </Col>
      </Row>
    </Form>
  );
};

export default DeckConfigurationForm;
