import { createContext, ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.tsx";

// Type
type CartItem = {
  id: number;
  quantity: number;
  price: number;
  name: string;
  thumbnail: string;
};

type ShoppingCartContextProps = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (
    id: number,
    name: string,
    price: number,
    thumbnail: string,
  ) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  startNewOrder: () => void;
};

type ShoppingCartProviderProps = {
  children: ReactNode;
};

// Context Store
export const ShoppingCartContext = createContext(
  {} as ShoppingCartContextProps,
);

// Context Provider
export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    [],
  );

  // Get total quantity for cart
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0,
  );

  // Get quantity of an item with id
  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const startNewOrder = () => {
    setCartItems([]);
  };

  // Increase quantity when click add to cart button or click plus button
  const increaseCartQuantity = (
    id: number,
    name: string,
    price: number,
    thumbnail: string,
  ) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, price, name, thumbnail, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  // Decrease quantity when click minus button
  const decreaseCartQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  // Remove an item from cart when click close button
  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        startNewOrder,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
