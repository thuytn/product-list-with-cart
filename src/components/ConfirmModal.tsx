import { formatCurrency } from "../utils/formatCurrency.ts";
import { useShoppingCart } from "../hooks/useShoppingCart.tsx";
import { Dispatch, SetStateAction } from "react";

function ConfirmModal({
  setIsOpen,
  getTotal,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  getTotal: () => string;
}) {
  const { cartItems, getItemQuantity, startNewOrder } = useShoppingCart();
  return (
    <section className="absolute left-0 top-0 h-full w-full bg-overlay">
      <div className="fixed bottom-0 left-0 flex h-max w-full flex-col gap-6 rounded-t-xl bg-white px-6 py-8 md:bottom-1/2 md:left-1/2 md:max-w-[590px] md:-translate-x-1/2 md:translate-y-1/2 md:rounded-xl">
        <img
          src="assets/images/icon-order-confirmed.svg"
          alt=""
          className="self-start"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-rose-900">Order Confirmed</h1>
          <p className="text-rose-500">We hope you enjoy your food!</p>
        </div>
        <div className="flex flex-col gap-6 rounded-lg bg-rose-50 p-6">
          <ul className="flex max-h-[235px] flex-col gap-4 overflow-y-scroll">
            {cartItems.map((cartItem) => (
              <li
                key={cartItem.id}
                className="flex items-center justify-between gap-2 border-b-[1px] border-b-rose-100 pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={cartItem.thumbnail}
                    alt=""
                    className="h-[50px] w-[50px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col gap-2 text-sm">
                    <h2 className="line-clamp-1 font-semibold text-rose-900">
                      {cartItem.name}
                    </h2>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-red">
                        {cartItem.quantity}x
                      </span>
                      <span className="text-rose-400">
                        <small>@</small> {formatCurrency(cartItem.price)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="font-semibold text-rose-900">
                  {formatCurrency(
                    cartItem.price * getItemQuantity(cartItem.id),
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between">
            <span className="text-sm text-rose-900">Order Total</span>
            <span className="text-2xl font-semibold text-rose-900">
              {getTotal()}
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            setIsOpen((prevState) => !prevState);
            startNewOrder();
          }}
          className="cursor-pointer rounded-full bg-red py-4 font-semibold text-rose-50 transition-all hover:bg-rose-800"
        >
          Start New Order
        </button>
      </div>
    </section>
  );
}

export default ConfirmModal;
