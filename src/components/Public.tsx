import React from "react";
import { Link } from "react-router-dom";

const Public = () => {
  return (
    <>
      <h1>Public</h1>
      <Link to="/login">login</Link>
    </>
  );
};

export default Public;
