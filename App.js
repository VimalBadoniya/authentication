import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorElement from "./components/ErrorElement";
import RootUI from "./components/RootUI";
import ChangePassword from "./pages/ChangePassword";
import AuthPage from "./pages/AuthPage";

import LoginContextProvider from "./source/LoginContextProvider";
import ProfilePage from "./pages/ProfilePage";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootUI />,
    errorElement: <ErrorElement />,
    children: [
      { index: true, element: <AuthPage /> },
      { path: "/auth:login", element: <AuthPage loginpage={true}/> },
      { path: "/auth:signup", element: <AuthPage signuppage={true}/> },
      { path: "/auth:guest-login", element: <AuthPage guestloginpage={true}/> },
      { path : "/profile", element : <ProfilePage/> } ,
      {path : "/profile/change-password" , element : <ChangePassword/>}
    ],
  },
]);

function App() {
  return (
    <LoginContextProvider>
      <RouterProvider router={myRouter}></RouterProvider>
    </LoginContextProvider>
  );
}

export default App;
