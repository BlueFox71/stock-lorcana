import { Button, Flex } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  && {
    width: 80%;
    margin: 0 auto;
    padding: 50px;
  }
`;

const MenuItems = styled.div`
  && {
    width: 80%;
    margin: 0 auto;
    padding: 50px;
  }
`;

const ButtonMenu = styled(Button)`
  height: 70px;
  width: auto;
  font-size: 20px;
`;

const Home = () => {
  return (
    <Container>
      <h1>Stock Lorcana de Jules et Alexis</h1>
      <MenuItems>
        <Flex justify={"center"} align="center">
          <Link to="/stock">
            <ButtonMenu type="primary">Inventaire</ButtonMenu>
          </Link>
        </Flex>
      </MenuItems>
    </Container>
  );
};

export default Home;
