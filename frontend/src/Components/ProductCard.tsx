import { useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import api from "../api";

interface ProductCardProps {
  productId: number;
  name: string;
  image: string;
  price: number;
  isFavorite:any;
}

function ProductCard({ productId, name, image, price,isFavorite }: ProductCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isFilled, setIsFilled] = useState(isFavorite);
  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const toggleHeart = async () => {
    if (!isFilled) {
      try {
        await api.post(
          "/api/addFavoriteProduct",
          {
            productId: productId,
          },
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        setIsFilled(!isFilled);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      try {
        await api.delete(
          `/api/removeFavoriteProduct/${productId}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        setIsFilled(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-between p-5 bg-background shadow-lg rounded-lg relative">
      {isImageLoading && (
        <Skeleton className="w-3/4 h-[200px] mb-4 rounded-lg" />
      )}
      <img
        src={image}
        alt={name}
        className={`w-1/2 h-auto mb-4 object-cover ${
          isImageLoading ? "hidden" : "block"
        }`}
        onLoad={handleImageLoad}
      />
      <div className="text-center flex flex-col justify-center items-center gap-3">
        <p className="font-bold text-lg">{name}</p>
        <p className="font-bold text-xl mb-5">{price.toFixed(2)} RSD</p>
      </div>
      <Button className="w-3/4">Add to cart</Button>
      <svg
        onClick={toggleHeart}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill={isFilled ? "red" : "none"}
        stroke="red"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="cursor-pointer"
        style={{
          transition: "fill 0.3s ease",
          position: "absolute",
          right: "20",
        }}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </div>
  );
}

export default ProductCard;
