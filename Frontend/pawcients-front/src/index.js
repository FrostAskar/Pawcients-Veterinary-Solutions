import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./Routes/Login";
import NotFoundPage from "./Routes/NotFoundPage";
import PresentationPage from "./Routes/PresentationPage";
import AboutUs from "./Routes/AboutUs";
import Contact from "./Routes/Contact";
import ConfirmationEmail from "./Routes/ConfirmationEmail";
import SignUp from "./Routes/Worker/SignUp";
import SessionExpired from "./Routes/SessionExpired";
import MyMascots from "./Routes/MyMascots";
import Root from "./Routes/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "Worker/signup", element: <SignUp /> },
      { path: "/", element: <PresentationPage /> },
      { path: "/aboutus", element: <AboutUs /> },
      { path: "/contact", element: <Contact /> },
      { path: "/confirmationemail", element: <ConfirmationEmail /> },
      { path: "/sessionexpired", element: <SessionExpired /> },
      { path: "/mymascots", element: <MyMascots /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
