import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage/HomePage";
import PersonelPage from "./pages/PersonelRecord/PersonelPage";
import UserProfile from "./pages/UserProfile/UserProfile";
import SignupPage from "./pages/SignPage/SignupPage";
import SigninPage from "./pages/SignPage/SigninPage";
import PartitivePage from "./components/Partitiva";
import PasswordUpdatePage from "./pages/SignPage/PasswordUpdatePage.jsx";
import As from "./position-management";
import PresentPage from "./pages/PresentPage/PresentPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/home", element: <HomePage /> },
      { path: "/personel", element: <PersonelPage /> },
      { path: "/department", element: <PartitivePage /> },
      { path: "/position", element: <As /> },
      {
        path: "/present",
        element: <PresentPage/>,
      },
      {
        path: "/profile/:userId",
        element: <UserProfile />,
      },
    ],
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
    path: "/Partitive",
    element: <PartitivePage />,
  },
  {
    path: "/Password",
    element: <PasswordUpdatePage />,
  },
  
]);

export default router;
