import React from "react";
import ReactDOM from "react-dom/client";
import "index.css";

import reportWebVitals from "reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "Routes/LandingPage/Login";
import NotFoundPage from "Routes/Common/NotFoundPage";
import PresentationPage from "Routes/LandingPage/PresentationPage";
import AboutUs from "Routes/LandingPage/AboutUs";
import Contact from "Routes/LandingPage/Contact";
import ConfirmationEmail from "Routes/Common/ConfirmationEmail";
import SignUp from "Routes/Worker/SignUp";
import SessionExpired from "Routes/Common/SessionExpired";
import MyMascots from "Routes/Client/MyMascots";
import Root from "Routes/Root";
import ClientDashboard from "Routes/Client/ClientDashboard";
import VetDashboard from "Routes/Worker/VetDashboard";

import ProfileSettings from "Routes/Common/ProfileSettings";

import AnimalProfile from "Routes/Common/AnimalProfile";
import CustomerManagement from "Routes/Worker/Base/CustomerManagement";
import MascotsManagement from "Routes/Worker/Base/MascotsManagement";
import StaffManagement from "Routes/Worker/Base/StaffManagement";
import CalendarPage from "Routes/Calendar/CalendarPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/", element: <PresentationPage /> },
      { path: "/aboutus", element: <AboutUs /> },
      { path: "/contact", element: <Contact /> },
      { path: "/confirmationemail", element: <ConfirmationEmail /> },
      { path: "/sessionexpired", element: <SessionExpired /> },
      { path: "/mymascots", element: <MyMascots /> },
      { path: "/clientdashboard", element: <ClientDashboard /> },
      { path: "/vetdashboard", element: <VetDashboard /> },
      { path: "/vet/clients", element: <CustomerManagement /> },
      { path: "/vet/mascots", element: <MascotsManagement /> },
      { path: "/vet/staff", element: <StaffManagement /> },
      { path: "/profilesettings", element: <ProfileSettings /> },
      {
        path: "/client/:clientId/mascot/:mascotId",
        element: <AnimalProfile />,
      },
      { path: "/vet/mascot/:mascotId", element: <AnimalProfile /> },
      { path: "/vetcalendar", element: <CalendarPage /> },
      { path: "/clientcalendar", element: <CalendarPage /> },
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
