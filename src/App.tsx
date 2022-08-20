import React from "react";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import Welcome from "./features/auth/Welcome";
import RequireAuth from "./features/auth/RequireAuth";
import ThemeCustomization from "./themes";
import Routes from "routes";
function App() {
  return (
    <ThemeCustomization>
      <Routes />
    </ThemeCustomization>
  );
}

export default App;
