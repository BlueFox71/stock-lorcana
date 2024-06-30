import React from "react";
import { FloatButton } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { RESET_CARDS, RESET_FILTERS } from "../../pages/stock/store/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { DECKS } from "../../routes/routes";

const FloatButtonBack = styled(FloatButton)`
  && {
    top: 20px;
    left: 20px;
  }
`;

const ButtonBack = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch({ type: RESET_FILTERS });
    dispatch({ type: RESET_CARDS });
    if (
      location.pathname.includes('/decks/edition') ||
      location.pathname.includes('/decks/profile') ||
      location.pathname.includes('/decks/new')
    ) {
      navigate("/" + DECKS);
    } else {
      navigate("/");
    }
  };

  return (
    <FloatButtonBack
      type="primary"
      className="button-lorcana"
      icon={<ArrowLeftOutlined />}
      style={{ zIndex: "2000" }}
      onClick={handleClick}
    />
  );
};

export default ButtonBack;
