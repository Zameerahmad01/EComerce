import ProductFilter from "@/components/shopping/Filter";
import { ArrowUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFilteredProducts } from "@/store/shop/product-slice";
import { useSelector } from "react-redux";
import ShoppingProductTile from "@/components/shopping/Product-tile";

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const { productsList, isLoading } = useSelector(
    (state) => state.shopProducts
  );
  // console.log(productsList);

  useEffect(() => {
    dispatch(getFilteredProducts());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productsList.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="w-4 h-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup>
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem key={option.id}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {productsList.length > 0 ? (
            productsList.map((product) => (
              <ShoppingProductTile key={product._id} product={product} />
            ))
          ) : (
            <div>No products found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;
