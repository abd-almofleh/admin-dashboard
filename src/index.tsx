import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { store } from "app/store";
import App from "./App";
import "app/localization";

import "./index.css";
import "simplebar/src/simplebar.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const index = (
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
);
root.render(index);
