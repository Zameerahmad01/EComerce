import { Button } from "../ui/button";
import { AlignJustify, LogOut } from "lucide-react";

const AdminHeader = ({ open, setOpen }) => {
  return (
    <header className="flex justify-center items-center px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(!open)} className="lg:hidden sm:block ">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow">
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
