import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage/HomePage";
import PersonelPage from "./pages/PersonelRecord/PersonelPage";
import LoginPages from "./pages/SignPage/SigninPage";
import UserProfile from "./pages/UserProfile/UserProfile";
import SignUpPage from "./pages/SignPage/SignupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/home", element: <HomePage /> },
      { path: "/personel", element: <PersonelPage /> },
      {
        path: "/profile/:userId",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/signin",
    element: <LoginPages />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);

export default router;
