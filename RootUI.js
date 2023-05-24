import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const RootUI = () => {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
    </React.Fragment>
  );
};

export default RootUI;
