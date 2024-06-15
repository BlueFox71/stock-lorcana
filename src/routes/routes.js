import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Stock from "../pages/stock";
import Home from "../pages/home";
import AuthentificationModal from "../_components/AuthentificationModal";
import Import from "../pages/import";

const NotFound = () => {
  return <h2>404 Not Found</h2>;
};

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="stock" element={<Stock />} />
        <Route path="import" element={<Import/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AuthentificationModal />
    </Router>
  );
};

export default Routers;
