import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import Footer from "../components/Footer";
import "./layout.css";
const MainLayout = () => {
  return (
    <div>
      <div className="App">
        <Header />
        <div className="DbSidebarContent">
          <Sidebar />
          <Content />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
