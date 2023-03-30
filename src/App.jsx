import "./App.css";
// import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/index";
import { Space } from "antd";
import Sidebar from "./components/Sidebar/index";
import Content from "./components/Content/index";
import Footer from "./components/Footer/index";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="DbSidebarContent">
        <Sidebar></Sidebar>
        <Content></Content>
      </div>
      <Footer />
    </div>
  );
}

export default App;
