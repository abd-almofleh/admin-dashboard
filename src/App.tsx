import React from "react";
import { Admin, Resource } from "react-admin";
import UserList from "./users/list";
import jsonServerProvider from "ra-data-json-server";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={UserList} />
    </Admin>
  );
}

export default App;
