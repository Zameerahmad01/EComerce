import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./cart-item-content";
import { useNavigate } from "react-router-dom";

function UserCartWrapper({ cartItems, setCartOpen }) {
  const navigate = useNavigate();

  const TotalPrice = cartItems.reduce(
    (acc, item) => acc + (item.salePrice || item.price) * item.quantity,
    0
  );
  return (
    <SheetContent className="sm:max-w-md ">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent key={item._id} cartItem={item} />
          ))
        ) : (
          <div>No items in cart</div>
        )}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-lg font-semibold">
            ${TotalPrice.toFixed(2)}
          </span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setCartOpen(false);
        }}
        className="w-full mt-4"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
