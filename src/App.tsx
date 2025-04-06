import FilterDrawer from "./components/Filter/FilterDrawer";
import Navbar from "./components/Navbar";
import Transactions from "./components/Transactions/Transactions";
import Wallet from "./components/Wallet/Wallet";

const App = () => {
  return (
    <main className="w-full min-h-screen">
      <Navbar />
      <FilterDrawer />
      <section className="inner-container pb-10">
        <Wallet />
        <Transactions />
      </section>
    </main>
  );
};

export default App;
