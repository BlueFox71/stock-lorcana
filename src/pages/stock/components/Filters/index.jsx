import { Button, Card, Checkbox, Col, Input, Row } from "antd";
import React from "react";
import styled from "styled-components";
import CheckboxWithImage from "../CheckBoxWithImage";
import PropTypes from "prop-types";
import { SearchOutlined } from "@ant-design/icons";

const Container = styled(Card)`
  min-height: 150px;
  border-radius: 10px;
  margin: 20px;
  padding: 10px;
`;

const CardStyled = styled(Card)`
  && {
    border: none;
    .ant-card-head {
      min-height: 3px;
      border-bottom: none;
      text-transform: uppercase;
      text-align: center;
    }
    .ant-card-body > div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const colorsOptions = [
  { value: "Ambre", src: "colors/amber.webp" },
  { value: "Améthyste", src: "colors/amethyst.webp" },
  { value: "Émeraude", src: "colors/emerald.webp" },
  { value: "Rubis", src: "colors/ruby.webp" },
  { value: "Saphir", src: "colors/sapphire.webp" },
  { value: "Acier", src: "colors/steel.png" },
];

const rarityOptions = [
  { value: "Commun", src: "rarity/common.webp" },
  { value: "Inhabituel", src: "rarity/unusual.webp" },
  { value: "Rare", src: "rarity/rare.webp" },
  { value: "Super Rare", src: "rarity/super_rare.webp" },
  { value: "Légendaire", src: "rarity/legendary.webp" },
  { value: "Enchantée", src: "rarity/enchanted.png" },
];

const typeOptions = [
  { value: "Personnage", label: "Personnage" },
  { value: "Objet", label: "Objet" },
  { value: "Action", label: "Action" },
  { value: "Action - Chanson", label: "Action - Chanson" },
  { value: "Lieu", label: "Lieu" },
];

const chapterOptions = [
  { value: "1", label: "1 - Premier Chapitre" },
  { value: "2", label: "2 - L'Ascension des Floodborn" },
  { value: "3", label: "3 - Les Terres d'Encres" },
  { value: "4", label: "4 - Le retour d'Ursula" },
];
const FiltersComponent = (props) => {
  const { filters, countCards, isFetching } = props;

  const handleChange = (name, value) => {
    props.onChange(name, value);
  };

  return (
    <Container>
      <Row align={"center"}>
        <Row>
          <Col lg={12}>
            <CardStyled title={"Couleurs des encres"}>
              <Checkbox.Group
                className="checkbox-color"
                value={filters.colors}
                onChange={(value) => handleChange("colors", value)}
              >
                {colorsOptions.map((option) => (
                  <CheckboxWithImage
                    className="checkbox-color"
                    key={option.value}
                    value={option.value}
                    imageSrc={option.src}
                  />
                ))}
              </Checkbox.Group>
            </CardStyled>
          </Col>
          <Col lg={12}>
            <CardStyled title="Rareté">
              <Checkbox.Group
                className="checkbox-color"
                value={filters.rarities}
                onChange={(value) => handleChange("rarities", value)}
              >
                {rarityOptions.map((option) => (
                  <CheckboxWithImage
                    className="checkbox-color"
                    key={option.value}
                    value={option.value}
                    imageSrc={option.src}
                  />
                ))}
              </Checkbox.Group>
            </CardStyled>
          </Col>
        </Row>
        <Row>
          <Col lg={10}>
            <CardStyled title="Types">
              <Checkbox.Group
                options={typeOptions}
                value={filters.types}
                onChange={(value) => handleChange("types", value)}
              />
            </CardStyled>
          </Col>
          <Col lg={10}>
            <CardStyled title="Sets">
              <Checkbox.Group
                options={chapterOptions}
                value={filters.chapters}
                onChange={(value) => handleChange("chapters", value)}
              />
            </CardStyled>
          </Col>
          <Col lg={3}>
            <CardStyled title="Quantité">
              <Checkbox
                key={"missingCard"}
                value={"missingCard"}
                checked={filters.missingCard}
                onChange={(e) => handleChange("missingCard", e.target.checked)}
              >
                Non possédé
              </Checkbox>
            </CardStyled>
          </Col>
        </Row>
        <Row align={"center"}>
          <Col lg={24}>
            <Input
              addonAfter={<SearchOutlined />}
              placeholder="Recherche"
              onChange={(e) => props.onSearch(e)}
              style={{ width: 200, margin: "5px" }}
              defaultValue={filters.search}
              allowClear
            />
            <Button
              style={{ margin: "5px" }}
              onClick={() => props.onReset(true)}
              type="primary"
            >
              Réinitialiser les filtres
            </Button>
            <Button
              style={{ margin: "5px" }}
              onClick={props.onClose}
              type="primary"
            >
              Fermer
            </Button>
          </Col>
        </Row>
      </Row>
      {!isFetching && (<Row align={"end"}>
        <h2 style={{ margin: 0 }}>{` ${countCards} CARTE${
          countCards > 1 ? "S" : ""
        }`}</h2>
      </Row>)}
    </Container>
  );
};

FiltersComponent.propTypes = {
  onChange: PropTypes.shape(),
  filters: PropTypes.array,
  onReset: PropTypes.func,
  onClose: PropTypes.func,
  onSearch: PropTypes.func,
  countCards: PropTypes.number,
  isFetching: PropTypes.bool
};

export default FiltersComponent;
