import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import "antd/dist/reset.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
