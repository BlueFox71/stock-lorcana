import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/checkbox.css";
import "./styles/fonts.css";
import "./styles/text.css";
import "./styles/colors.css";
import Routers from "./routes/routes";
import { ConfigProvider } from "antd";
import { theme } from "./styles/theme";
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <Routers />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
