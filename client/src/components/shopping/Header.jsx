import { HousePlug, Menu, ShoppingCart, UserCog, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { SheetContent, SheetTitle } from "../ui/sheet";
import { useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "../../config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "../../store/auth-slice/index";
import { useDispatch } from "react-redux";
import UserCartWrapper from "./cart-wraper";
import { useState, useEffect } from "react";
import { getCartItems } from "../../store/shop/cart-slice";
import { Label } from "../ui/label";

const MenuItems = () => {
  const navigate = useNavigate();
  const handleNavigate = (item) => {
    sessionStorage.removeItem("filters");
    const currentFilters =
      item.id !== "home" && item.id !== "products"
        ? { category: [item.id] }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilters));
    navigate(item.path);
  };

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((item) => (
        <Label
          className="text-sm font-medium cursor-pointer"
          onClick={() => {
            handleNavigate(item);
          }}
          key={item.id}
        >
          {item.label}
        </Label>
      ))}
    </nav>
  );
};

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [CartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems(user._id));
  }, [dispatch]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={CartOpen} onOpenChange={() => setCartOpen(!CartOpen)}>
        <Button
          onClick={() => setCartOpen(!CartOpen)}
          variant="outline"
          size="icon"
        >
          <ShoppingCart />
          <span className="sr-only">User Cart</span>
        </Button>
        <UserCartWrapper
          setCartOpen={setCartOpen}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="h-4 w-4 mr-2" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => dispatch(logoutUser())}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const ShoppingHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // console.log(user);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6  ">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <span className="sr-only">Toggle Menu</span>
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <SheetTitle className="text-lg font-semibold mb-5">Menu</SheetTitle>
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
