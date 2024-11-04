import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api from "../api";

interface FavoritesProviderProps {
  favoriteProductIds: number[];
  setFavoriteProductIds: (ids: number[]) => void;
}

const FavoritesContext = createContext<FavoritesProviderProps | null>(null);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteProductIds, setFavoriteProductIds] = useState<number[]>([]);

  const fetchFavoriteProducts = async () => {
    try {
      const response = await api.get("/api/favoriteProductIds", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const productIds = response.data.map((item: { productid: number }) => item.productid);
      setFavoriteProductIds(productIds);
    } catch (error) {
      console.error("Error fetching favorite products:", error);
    }
  };

  useEffect(() => {
    fetchFavoriteProducts();
  }, []);
  console.log(favoriteProductIds);
  

  return (
    <FavoritesContext.Provider
      value={{ favoriteProductIds, setFavoriteProductIds }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
