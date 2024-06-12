import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Stock from "../pages/stock";
import Home from "../pages/home";

const NotFound = () => {
  return <h2>404 Not Found</h2>;
};

const Routers = () => {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="stock" element={<Stock />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};

export default Routers;
