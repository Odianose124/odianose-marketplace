import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";

import App from "./App";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { RequestProvider } from "./context/RequestContext";

import "./index.css";


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <AuthProvider>

  <RequestProvider>

    <WishlistProvider>

      <CartProvider>

        <App />

      </CartProvider>

    </WishlistProvider>

  </RequestProvider>

</AuthProvider>

    </BrowserRouter>

  </React.StrictMode>

);