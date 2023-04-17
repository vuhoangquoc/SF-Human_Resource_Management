import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage/HomePage";
import PersonelPage from "./pages/PersonelRecord/PersonelPage";
import UserProfile from "./pages/UserProfile/UserProfile";
import SignupPage from "./pages/SignPage/SignupPage";
import SigninPage from "./pages/SignPage/SigninPage";
import PartitivePage from "./components/Partitiva";
<<<<<<< HEAD
import PasswordUpdatePage from "./pages/SignPage/PasswordUpdatePage.jsx";
=======
import As from "./position-management";
>>>>>>> 4e8176409c94991218e3f332dffc7c4e0e2260b1

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
  {
    path: "/Password",
    element: <PasswordUpdatePage />,
  },
]);

export default router;
