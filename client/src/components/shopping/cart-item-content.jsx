import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/store/shop/cart-slice";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { updateCartItemQuantity } from "@/store/shop/cart-slice";
function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleRemoveFromCart(cartItem) {
    dispatch(
      removeFromCart({ userId: user?._id, productId: cartItem?.productId })
    ).then((data) => {
      toast({
        title: data?.payload?.message,
        variant: "default",
      });
    });
  }

  function handleQuantity(cartItem, type) {
    dispatch(
      updateCartItemQuantity({
        userId: user?._id,
        productId: cartItem?.productId,
        quantity:
          type === "plus" ? cartItem?.quantity + 1 : cartItem?.quantity - 1,
      })
    ).then((data) => {
      toast({
        title: data?.payload?.message,
        variant: "default",
      });
    });
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            onClick={() => handleQuantity(cartItem, "minus")}
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded"
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            onClick={() => handleQuantity(cartItem, "plus")}
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded"
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(cartItem?.salePrice || cartItem?.price) *
            cartItem?.quantity.toFixed(2)}
        </p>
        <span
          onClick={() => handleRemoveFromCart(cartItem)}
          className="border rounded-md p-1"
        >
          <Trash className="w-6 h-6 cursor-pointer" />
        </span>
      </div>
    </div>
  );
}

export default UserCartItemsContent;
