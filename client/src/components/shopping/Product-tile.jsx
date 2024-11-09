import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
function ShoppingProductTile({
  product,
  handleProductDetails,
  handleAddToCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[250px] object-cover rounded-t-lg"
          />
          {product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground capitalize">
              {product?.category}
            </span>
            <span className="text-sm text-muted-foreground capitalize">
              {product?.brand}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span
              className={`${
                product?.salePrice > 0
                  ? "line-through text-muted-foreground"
                  : "text-primary"
              } text-lg font-semibold `}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-2">
        <Button
          onClick={() => handleAddToCart(product?._id)}
          className="w-full"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
