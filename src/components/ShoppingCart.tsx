import { formatCurrency } from "../utils/formatCurrency.ts";
import { useState } from "react";
import { useShoppingCart } from "../hooks/useShoppingCart.tsx";
import storeItems from "../data/data.json";
import ConfirmModal from "./ConfirmModal.tsx";

function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, cartQuantity, getItemQuantity, removeFromCart } =
    useShoppingCart();

  const getTotal = () => {
    return formatCurrency(
      cartItems.reduce((total, cartItem) => {
        const item = storeItems.find((i) => i.id === cartItem.id);
        return total + (item?.price || 0) * cartItem.quantity;
      }, 0),
    );
  };

  return (
    <section className="flex flex-col gap-2 rounded-lg bg-white p-6 md:max-h-screen md:w-[325px] md:self-start xl:w-[385px] xl:p-8">
      <h1 className="text-2xl font-bold text-red xl:text-3xl">
        Your Cart <span>({cartQuantity})</span>
      </h1>

      {cartQuantity === 0 ? (
        <div className="flex flex-col items-center justify-center gap-6 py-4">
          <img src="assets/images/illustration-empty-cart.svg" alt="" />
          <p className="font-semibold text-rose-500">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <ul>
            {cartItems.map((cartItem) => (
              <li
                key={cartItem.id}
                className="flex items-center justify-between border-b-[1px] border-b-rose-100 py-6"
              >
                <div className="flex flex-col gap-2 text-sm">
                  <h2 className="font-semibold text-rose-900">
                    {cartItem.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-red">
                      {cartItem.quantity}x
                    </span>
                    <span className="ml-1 flex gap-1 text-rose-400">
                      <small>@</small>
                      {formatCurrency(cartItem.price)}
                    </span>
                    <span className="font-semibold text-rose-500">
                      {formatCurrency(
                        cartItem.price * getItemQuantity(cartItem.id),
                      )}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(cartItem.id)}
                  className="flex h-5 w-5 items-center justify-center rounded-full border border-rose-300 text-rose-300 transition-all hover:border-rose-900 hover:text-rose-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    fill="currentColor"
                    viewBox="0 0 10 10"
                  >
                    <path
                      fill="currentColor"
                      d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between">
            <span className="text-sm text-rose-900">Order Total</span>
            <span className="text-2xl font-semibold text-rose-900">
              {getTotal()}
            </span>
          </div>
          <div className="flex items-center justify-center gap-4 rounded-lg bg-rose-50 p-4">
            <img src="assets/images/icon-carbon-neutral.svg" alt="" />
            <p className="text-sm text-rose-900">
              This is a{" "}
              <strong className="font-semibold">carbon-neutral</strong> delivery
            </p>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer rounded-full bg-red py-4 font-semibold text-rose-50 transition-all hover:bg-rose-800"
          >
            Confirm Order
          </button>
        </div>
      )}
      {/*ConfirmModal*/}
      {isOpen && <ConfirmModal setIsOpen={setIsOpen} getTotal={getTotal} />}
    </section>
  );
}

export default ShoppingCart;
