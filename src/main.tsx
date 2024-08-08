import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ShoppingCartProvider } from "./context/ShoppingCartContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ShoppingCartProvider>
      <App />
    </ShoppingCartProvider>
  </React.StrictMode>,
);
