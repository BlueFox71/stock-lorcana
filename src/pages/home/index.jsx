import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LOGOUT } from "../stock/store/constants";

const Container = styled.div`
  && {
    width: 80%;
    margin: 0 auto;
    padding: 50px;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuItems = styled.div`
  && {
    padding: 50px;
  }
`;

const ButtonMenu = styled(Button)`
  height: 70px;
  width: 600px;
  font-size: 20px;
  margin: 10px;
`;

const selector = (state) => ({
  authentication: state.authentication,
});

const Home = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: LOGOUT });
  };
  const [username, setUsername] = useState(null);
  const { authentication } = useSelector(selector);

  useEffect(() => {
     setUsername(localStorage.getItem("username"))

  }, [authentication]);
  return (
    <Container>
      <h1>Stock Lorcana de Jules et Alexis</h1>
      <MenuItems>
        <Buttons>
          <Link to="/stock">
            <ButtonMenu type="primary">Inventaire</ButtonMenu>
          </Link>
          {username === "jules" && (
            <Link to="/import">
              <ButtonMenu>Importer les cartes</ButtonMenu>
            </Link>
          )}
          <ButtonMenu onClick={handleLogout}> Se déconnecter</ButtonMenu>
        </Buttons>
      </MenuItems>
    </Container>
  );
};

export default Home;
