import React from "react";
import { List, Datagrid, TextField, EmailField } from "react-admin";
import { UrlField } from "../components";
const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="phone" />
      <UrlField source="website" />
    </Datagrid>
  </List>
);
export default UserList;
