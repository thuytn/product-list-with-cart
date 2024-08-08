import React from "react";
import { formatCurrency } from "../utils/formatCurrency.ts";
import { useShoppingCart } from "../hooks/useShoppingCart.tsx";

// Type
type StoreItemProps = {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
  id: number;
};

function StoreItem({ image, name, category, price, id }: StoreItemProps) {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart();
  const quantity = getItemQuantity(id);

  return (
    <div className="flex flex-col gap-10">
      <div className="relative aspect-[16/9] w-full md:aspect-[4/3] xl:aspect-square">
        <div
          style={
            {
              "--mobile-url": `url(${image.mobile})`,
              "--tablet-url": `url(${image.tablet})`,
              "--desktop-url": `url(${image.desktop})`,
            } as React.CSSProperties
          }
          className={`absolute left-0 top-0 h-full w-full rounded-lg bg-[image:var(--mobile-url)] bg-cover bg-center bg-no-repeat md:bg-[image:var(--tablet-url)] xl:bg-[image:var(--desktop-url)] ${quantity ? "ring-2 ring-inset ring-red" : ""}`}
        ></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          {quantity === 0 ? (
            // if your cart does not include the item, it will be showed
            <button
              onClick={() =>
                increaseCartQuantity(id, name, price, image.thumbnail)
              }
              className="flex min-w-max items-center justify-center gap-2 rounded-full border-[1px] border-rose-300 bg-white px-6 py-3 text-rose-900 shadow-lg transition-all hover:border-red hover:text-red md:px-4 md:py-2"
            >
              <img src="assets/images/icon-add-to-cart.svg" alt="" />
              <span className="text-sm font-semibold">Add to Cart</span>
            </button>
          ) : (
            // if your cart includes the item, it will be showed
            <div className="flex items-center justify-between gap-12 rounded-full bg-red px-3 py-2 shadow-lg md:gap-8">
              <button
                onClick={() => decreaseCartQuantity(id)}
                className="flex h-4 w-4 items-center justify-center rounded-full border-[1px] border-rose-50 text-rose-50 transition-all hover:bg-rose-50 hover:text-red"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="2"
                  fill="currentColor"
                  viewBox="0 0 10 2"
                >
                  <path fill="currentColor" d="M0 .375h10v1.25H0V.375Z" />
                </svg>
              </button>
              <span className="text-rose-50">{quantity}</span>
              <button
                onClick={() =>
                  increaseCartQuantity(id, name, price, image.thumbnail)
                }
                className="flex h-4 w-4 items-center justify-center rounded-full border-[1px] border-rose-50 text-rose-50 transition-all hover:bg-rose-50 hover:text-red"
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
                    d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/*StoreItem Content*/}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm text-rose-400">{category}</h3>
        <h2 className="line-clamp-1 font-semibold text-rose-900">{name}</h2>
        <span className="font-semibold text-red">{formatCurrency(price)}</span>
      </div>
    </div>
  );
}

export default StoreItem;
