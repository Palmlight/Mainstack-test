import FilterDrawer from "./components/Filter/FilterDrawer";
import Navbar from "./components/Navbar";
import Transactions from "./components/Transactions/Transactions";
import Wallet from "./components/Wallet/Wallet";

const App = () => {
  const quickLinks = [
    "/icons/bar1.svg",
    "/icons/bar2.svg",
    "/icons/bar3.svg",
    "/icons/bar4.svg"
  ];

  return (
    <main className="w-full h-screen flex flex-col">
      <Navbar />
      <FilterDrawer />

      <div className="main-container relative h-full overflow-hidden">
        <section className="inner-container pb-10 h-full overflow-auto">
          <Wallet />
          <Transactions />
        </section>

        <div className="absolute left-2 top-[270px] py-1 gap-1 flex flex-col rounded-full w-12 bg-white quick-links">
          {quickLinks?.map(link => (
            <img
              src={link}
              alt="Alt link"
              className="cursor-pointer"
              key={link}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default App;
