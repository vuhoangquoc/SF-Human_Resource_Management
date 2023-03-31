import React from "react";
import { Outlet } from "react-router";

const Content = () => {
  return (
    <div className="DbContent">
      <Outlet />
    </div>
  );
};

export default Content;
