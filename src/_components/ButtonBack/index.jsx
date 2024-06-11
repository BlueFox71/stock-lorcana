import React from "react";
import { FloatButton } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { RESET_FILTERS } from "../../pages/stock/store/constants";

const FloatButtonBack = styled(FloatButton)`
  && {
    top: 20px;
    left: 20px;
  }
`;

const ButtonBack = () => {
  const dispatch = useDispatch()
  const handleClick = () => {
    window.history.back()
    dispatch({type: RESET_FILTERS})
  }
  return (
    <FloatButtonBack
      type="primary"
      className="button-lorcana"
      icon={<ArrowLeftOutlined />}
      onClick={handleClick}
    />
  );
};

export default ButtonBack;
