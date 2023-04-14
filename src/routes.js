import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage/HomePage";
import PersonelPage from "./pages/PersonelRecord/PersonelPage";
import LoginPages from "./pages/SignPage/SigninPage";
import UserProfile from "./pages/UserProfile/UserProfile";
import SignUpPage from "./pages/SignPage/SignupPage";
import SignupPage from "./pages/SignPage/SignupPage";
import SigninPage from "./pages/SignPage/SigninPage";
import PartitivePage from "./components/Partitiva";
import As from "./position-management";

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
]);

export default router;
