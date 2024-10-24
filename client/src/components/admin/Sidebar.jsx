import {
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBag,
  ShoppingBasket,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

export const adminSidebar = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ShoppingBag />,
  },
];

function MenuItem({ setOpen }) {
  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebar.map((item) => (
        <Link
          key={item.id}
          to={item.path}
          onClick={setOpen ? () => setOpen(false) : null}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground text-xl cursor-pointer"
        >
          {item.icon}
          <span className="">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex items-center gap-2 pb-2">
                <ChartNoAxesCombined size={30} />
                Admin Panel
              </SheetTitle>
            </SheetHeader>
            <MenuItem setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItem />
      </aside>
    </>
  );
};

export default AdminSidebar;
