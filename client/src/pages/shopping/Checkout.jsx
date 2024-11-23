import Address from "@/components/shopping/Address";
import img from "./../../assets/account.jpg";
import { useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping/cart-item-content";
import { Button } from "@/components/ui/button";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const TotalPrice =
    cartItems && cartItems.items
      ? cartItems.items.reduce(
          (acc, item) => acc + (item.salePrice || item.price) * item.quantity,
          0
        )
      : 0;

  console.log(cartItems, "cartItems");
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          alt="account banner"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0 ? (
            cartItems.items.map((cartItem) => (
              <UserCartItemsContent cartItem={cartItem} />
            ))
          ) : (
            <div>No items in cart</div>
          )}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-semibold">
                ${TotalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-4 w-full">
            <Button className="w-full">Checkout with paypal</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
