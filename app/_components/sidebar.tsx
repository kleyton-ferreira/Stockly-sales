import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import SidebarButton from "./sidebar-button";

const Sidebar = () => {
  return (
    <div className="w-72 bg-white">
      <div className="px-7 py-6">
        <h1 className="text-2xl font-bold text-textGreen-primary">STOCKLY</h1>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <SidebarButton href="/">
          <LayoutGridIcon size={22} />
          Dashboard
        </SidebarButton>

        <SidebarButton href="/products">
          <PackageIcon size={22} />
          Produtos
        </SidebarButton>

        <SidebarButton href="/sales">
          <ShoppingBasketIcon size={22} />
          Vendas
        </SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
