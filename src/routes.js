import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage/HomePage";
import PersonelPage from "./pages/PersonelRecord/PersonelPage";
import UserProfile from "./pages/UserProfile/UserProfile";
import SignupPage from "./pages/SignPage/SignupPage";
import SigninPage from "./pages/SignPage/SigninPage";
import PartitivePage from "./components/Partitiva";
import PasswordUpdatePage from "./pages/SignPage/PasswordUpdatePage.jsx";
import CreateUser from "./pages/CreateUser/CreateUser";
import PresentPage from "./pages/PresentPage/PresentPage";
import PositionPage from "./pages/PositionPage/PositivePage";
import ContractPage from "./pages/ContractPage/ContractPage";

const isLogin = localStorage.getItem("isLoggedIn") === "true";
const router = createBrowserRouter([
  {
    // path: "/",
    element: <MainLayout />,
    errorElement: <h1>404 NOT FOUND</h1>,
    children: isLogin
      ? [
          { path: "/", element: <HomePage /> },
          { path: "/home", element: <HomePage /> },
          { path: "/personel", element: <PersonelPage /> },
          { path: "/department", element: <PartitivePage /> },
          { path: "/createuser", element: <CreateUser /> },
          { path: "/position", element: <PositionPage /> },
          {
            path: "/present",
            element: <PresentPage />,
          },
          { path: "/contract", element: <ContractPage /> },
          {
            path: "/profile/:userId",
            element: <UserProfile />,
          },
        ]
      : null,
  },
  {
    path: "/signin",
    element: <SigninPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/password",
    element: <PasswordUpdatePage />,
  },
]);
!isLogin && router.navigate("/signin");

export default router;
