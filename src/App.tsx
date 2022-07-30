import React from "react";
import { Admin, Resource } from "react-admin";
import UserList from "./users/list";
import jsonServerProvider from "ra-data-json-server";
import { authProvider } from "./providers";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="users" list={UserList} />
    </Admin>
  );
}

export default App;
