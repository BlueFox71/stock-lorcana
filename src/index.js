import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/checkbox.css";
import "./styles/fonts.css";
import "./styles/text.css";
import "./styles/colors.css";
import "./styles/loader.css";
import "./styles/customTheme.css";
import Routers from "./routes/routes";
import { ConfigProvider } from "antd";
import { theme } from "./styles/theme";
import { Provider } from "react-redux";
import store from "./store";
import frFR from "antd/es/locale/fr_FR";

const root = ReactDOM.createRoot(document.getElementById("root"));

const customLocale = {
  ...frFR,
  Image: {
    ...frFR.Image,
    preview: "Voir la carte",
  },
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={theme} locale={customLocale}>
        <Routers />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
