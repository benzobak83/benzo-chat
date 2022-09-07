import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import Footer from "./Footer";
import { burgerContext } from "../utils/burgerContext";

function Layout() {
  const [burgerIsOpen, setBurgerIsOpen] = useState(false);
  return (
    <burgerContext.Provider
      value={{
        burgerIsOpen,
        setBurgerIsOpen,
      }}
    >
      <Header />

      <Outlet />

      <Footer />
    </burgerContext.Provider>
  );
}

export { Layout };
