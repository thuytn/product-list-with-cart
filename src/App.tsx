import Store from "./components/Store.tsx";
import ShoppingCart from "./components/ShoppingCart.tsx";

function App() {
  return (
    <div className="relative min-h-screen bg-rose-50 flex items-center justify-center">
      <main className="flex flex-col gap-10 p-6 md:flex-row md:justify-between md:items-center md:gap-8 xl:max-w-[1220px] xl:gap-10">
        <Store />
        <ShoppingCart />
      </main>
    </div>
  );
}

export default App;
