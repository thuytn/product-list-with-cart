import storeItems from "../data/data.json";
import StoreItem from "./StoreItem.tsx";

function Store() {
  return (
    <section className="flex flex-col md:flex-1">
      <h1 className="mb-8 text-4xl font-bold text-rose-900">Desserts</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-4 xl:grid-cols-3 xl:gap-x-8">
        {storeItems.map((item) => (
          <StoreItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}

export default Store;
