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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredProducts } from "@/store/shop/product-slice";
import ShoppingProductTile from "@/components/shopping/Product-tile";
import { useSearchParams } from "react-router-dom";
import { getProductDetails } from "@/store/shop/product-slice";
import ProductDetailsDialog from "@/components/shopping/Product-details";
import { addToCart, getCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

//function for creating search params
function createSearchParamsHelper(filtersParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filtersParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

const ShoppingListing = ({ isHome }) => {
  const dispatch = useDispatch();
  const { productsList, productDetails, isLoading } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetails, setOpenDetails] = useState(false);
  const { toast } = useToast();

  function handleSort(value) {
    setSort(value);
  }

  //function for handling filters
  function handleFilter(getSectionId, getCurrentOption) {
    // console.log(getSectionId, getCurrentOption);
    let copyFilters = { ...filters };
    const indexOfCurrentSection =
      Object.keys(copyFilters).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOption],
      };
      // console.log(copyFilters);
    } else {
      const indexOfCurrentOption =
        copyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {
        copyFilters[getSectionId].push(getCurrentOption);
      } else {
        copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }
    setFilters(copyFilters);
    // console.log(filters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  }

  function handleProductDetails(id) {
    // console.log(id);
    dispatch(getProductDetails(id));
  }

  function handleAddToCart(id) {
    // console.log(id);
    dispatch(addToCart({ userId: user._id, productId: id, quantity: 1 })).then(
      (data) => {
        // console.log(data);
        if (data.payload.success) {
          dispatch(getCartItems(user._id));
        }
        toast({
          title: "Product added to cart",
        });
      }
    );
  }

  useEffect(() => {
    if (productDetails) setOpenDetails(true);
  }, [productDetails]);
  //function for creating search params
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  //function for getting filters from session storage
  useEffect(() => {
    const filters = sessionStorage.getItem("filters");
    if (filters) {
      setFilters(JSON.parse(filters));
    }
    setSort("price-lowtohigh");

    if (isHome) {
      setSort("price-lowtohigh");
      setFilters({});
    }
  }, []);

  //function for getting filtered products
  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        getFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  // if (isLoading)
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       Loading...
  //     </div>
  //   );
  return (
    <div
      className={`grid grid-cols-1 gap-6 p-4 md:p-6 ${
        isHome ? "md:grid-cols-[1fr]" : "md:grid-cols-[300px_1fr] "
      }`}
    >
      {!isHome ? (
        <ProductFilter filters={filters} handleFilter={handleFilter} />
      ) : null}
      <div className="bg-background w-full rounded-lg shadow-sm">
        {!isHome ? (
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
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={handleSort}
                  >
                    {sortOptions.map((option) => (
                      <DropdownMenuRadioItem value={option.id} key={option.id}>
                        {option.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ) : null}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {productsList.length > 0 ? (
            productsList.map((product) => (
              <ShoppingProductTile
                key={product._id}
                product={product}
                handleProductDetails={handleProductDetails}
                handleAddToCart={handleAddToCart}
                setOpenDetails={setOpenDetails}
              />
            ))
          ) : (
            <div>No products found</div>
          )}
        </div>
      </div>
      <ProductDetailsDialog
        productDetails={productDetails}
        handleAddToCart={handleAddToCart}
        open={openDetails}
        setOpen={setOpenDetails}
      />
    </div>
  );
};

export default ShoppingListing;
