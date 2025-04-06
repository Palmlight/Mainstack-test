import { cn } from "../utils/helpers.utils";

const navLinks = [
  { name: "Home", icon: "/icons/home.svg" },
  { name: "Analytics", icon: "/icons/analytics.svg" },
  { name: "Revenue", icon: "/icons/money.svg" },
  { name: "CRM", icon: "/icons/crm.svg" },
  { name: "Apps", icon: "/icons/apps.svg" }
];

const Navbar = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 py-4">
      <div className="main-container h-[64px] flex items-center bg-white justify-between border-2 border-white rounded-full nav-shadow">
        <img src="/icons/logo.svg" alt="logo" />
        <section className="flex items-center gap-5">
          {navLinks?.map(navLink => (
            <a
              href="#"
              className={cn(
                "flex gap-1 items-center pl-3.5 pr-[18px] text-[#56616B] py-2 rounded-full hover:bg-[#2d3b430d] hover:text-[#56616B]",
                { "bg-[#131316] text-white": navLink?.name === "Revenue" }
              )}
              key={navLink?.name}
            >
              <img src={navLink?.icon} alt={navLink?.name} />
              <span className="font-medium">{navLink?.name}</span>
            </a>
          ))}
        </section>
        <section className="flex items-center gap-2">
          <div className="h-10 w-10 flex items-center justify-center">
            <img src="/icons/notifications.svg" alt="notifications" />
          </div>
          <div className="h-10 w-10 flex items-center justify-center">
            <img src="/icons/chat.svg" alt="chat" />
          </div>
          <div className="py-1 pl-1 pr-3 flex items-center gap-2 rounded-full bg-[#EFF1F6]">
            <img src="/icons/avatar.svg" alt="avatar" />
            <img src="/icons/menu.svg" alt="menu" />
          </div>
        </section>
      </div>
    </nav>
  );
};

export default Navbar;
