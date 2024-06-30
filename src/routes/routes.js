import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Stock from "../pages/stock";
import Home from "../pages/home";
import AuthentificationModal from "../_components/AuthentificationModal";
import Import from "../pages/import";
import NotFound from "../shared/NotFound";
import Decks from "../pages/decks";
import DeckNewForm from "../pages/decks/pages/new";
import ButtonBack from "../_components/ButtonBack";
import { FloatButton } from "antd";
import DeckProfile from "../pages/decks/pages/profile";
import DeckEditionForm from "../pages/decks/pages/edition";

export const HOME = "/";
export const STOCK = "stock";
export const DECKS = "decks";
export const DECK_CREATION = "decks/new";
export const DECK_PROFILE = "decks/profile/:id";
export const DECK_EDITION = "decks/edition/:id";
export const IMPORT = "import";

const Routers = () => (
  <Router basename="/stock-lorcana">
    <Routes>
      <Route index element={<Home />} />
      <Route path={STOCK} element={<Stock />} />
      <Route path={DECKS} element={<Decks />} />
      <Route path={DECK_CREATION} element={<DeckNewForm />} />
      <Route path={DECK_PROFILE} element={<DeckProfile />} />
      <Route path={DECK_EDITION} element={<DeckEditionForm />} />
      <Route path={IMPORT} element={<Import />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <AuthentificationModal />
    <ButtonBack />
    <FloatButton.BackTop style={{ bottom: 100 }} />
  </Router>
);

export default Routers;
