import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider as ReduxProvider } from "react-redux";

import { BrowserRouter, Routes, Route } from "react-router-dom";
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
