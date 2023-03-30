import React from "react";
import { Route, Routes } from "react-router-dom";
// import PersonelPage from "./../../pages/PersonelRecords/PersonelPage";
import HomePage from "./../../pages/HomePage/HomePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      {/* <Route path="/personel" element={<PersonelPage />}></Route> */}
    </Routes>
  );
};

export default AppRoutes;
