import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { setProductDetails } from "@/store/shop/product-slice";

function ProductDetailsDialog({
  productDetails,
  handleAddToCart,
  open,
  setOpen,
}) {
  const dispatch = useDispatch();
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
        dispatch(setProductDetails());
      }}
    >
      <DialogContent className="max-w-[90vw] grid grid-cols-2 gap-8 sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            height={600}
            width={600}
            className="w-full aspect-square object-cover"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-2xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-xl mb-3 mt-2">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-2xl font-bold  ${
                productDetails?.salePrice > 0
                  ? "line-through text-muted-foreground"
                  : "text-primary"
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-2xl font-bold text-primary">
                ${productDetails?.salePrice}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 mt-0">
            <div className="flex items-center gap-1">
              <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            </div>
            <span className=" text-muted-foreground">(5.0)</span>
          </div>
          <div className="mt-5">
            <Button
              className="w-full"
              onClick={() => handleAddToCart(productDetails?._id)}
            >
              Add to Cart
            </Button>
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="flex gap-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Zameer Ahmad</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    this is a review
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
