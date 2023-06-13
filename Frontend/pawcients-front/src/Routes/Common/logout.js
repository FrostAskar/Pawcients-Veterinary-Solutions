import React from "react";
export default function Logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("IAT");
  window.location.href = "/login";
  return <div></div>;
}
