import banner1 from "../../assets/banner-1.webp";
import banner2 from "../../assets/banner-2.webp";
import banner3 from "../../assets/banner-3.webp";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ShirtIcon,
  CloudLightningIcon,
  BabyIcon,
  WatchIcon,
  Umbrella,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getFilteredProducts } from "@/store/shop/product-slice";
import { useSelector } from "react-redux";
import ShoppingProductTile from "@/components/shopping/Product-tile";
import { useNavigate } from "react-router-dom";
import ShoppingListing from "./Listing";

const category = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightningIcon },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: Umbrella },
];

const brand = [
  { id: "nike", label: "Nike", icon: ShirtIcon },
  { id: "adidas", label: "Adidas", icon: ShirtIcon },
  { id: "puma", label: "Puma", icon: ShirtIcon },
  { id: "levi", label: "Levi's", icon: ShirtIcon },
  { id: "zara", label: "Zara", icon: ShirtIcon },
  { id: "h&m", label: "H&M", icon: ShirtIcon },
];
const ShoppingHome = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { productsList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = (item, type) => {
    sessionStorage.removeItem("filters");
    const currentFilters = {
      [type]: [item.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilters));
    navigate("/shop/listing");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch(
      getFilteredProducts({ filterParams: {}, sortParams: "price-lowtohigh" })
    );
  }, [dispatch]);

  console.log(productsList, "productsList");

  const slides = [banner1, banner2, banner3];
  return (
    // banner section
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt="banner"
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setActiveSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* category and brand section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 mb-10">
          <h2 className="text-2xl font-bold text-center mb-4">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {category.map((item) => (
              <Card
                onClick={() => {
                  handleNavigate(item, "category");
                }}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="w-10 h-10 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-4">Shop by brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brand.map((item) => (
              <Card
                onClick={() => {
                  handleNavigate(item, "brand");
                }}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="w-10 h-10 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* featured products section */}
      <section className="py-12 ">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-4">
            Featured Products
          </h2>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {productsList && productsList.length > 0
              ? productsList.map((product) => (
                  <ShoppingProductTile key={product._id} product={product} />
                ))
              : null}
          </div> */}
          <ShoppingListing isHome={true} />
        </div>
      </section>
    </div>
  );
};

export default ShoppingHome;
