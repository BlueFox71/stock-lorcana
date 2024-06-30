import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LOGOUT } from "../stock/store/constants";
import { DECKS, IMPORT, STOCK } from "../../routes/routes";

const Container = styled.div`
  && {
    width: 80%;
    margin: 0 auto;
    padding: 50px 0;
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
  margin: 10px 0;

  @media screen and (max-width: 415px) {
    width: 300px;
  }
}
`;

const TitleMenu = styled.h1`
  && {
    @media screen and (max-width: 415px) {
      font-size: 50px;
    }
  }
`;

const selector = (state) => ({
  authentication: state.authentication,
});

const Home = () => {
  const dispatch = useDispatch();
  const { authentication } = useSelector(selector);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, [authentication]);

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <Container>
      <TitleMenu>Stock Lorcana de Jules et Alexis</TitleMenu>
      <MenuItems>
        <Buttons>
          <Link to={STOCK}>
            <ButtonMenu type="primary">Inventaire</ButtonMenu>
          </Link>
          <Link to={DECKS}>
            <ButtonMenu type="primary">Decks</ButtonMenu>
          </Link>
          {username === "jules" && window.innerWidth > 700 && (
            <Link to={IMPORT}>
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
