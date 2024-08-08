import { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext.tsx";

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
