import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useProvider } from "@/Context/Provider"; 
import api from "@/api";

interface Product {
  productid: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface CartContextType {
  cart: Product[];
  setCart: (cart: Product[]) => void;
  addToCart: (product: Product) => void;
  updateCart: (updatedProduct: Product) => void;
  loadCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const provider = useProvider();

  const loadCart = async () => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

    try {
      if (provider.user) {
        const { data: dbCart } = await api.get("/api/cart", {
          withCredentials: true,
        });

        if (dbCart && dbCart.length > 0) {
          setCart(dbCart);
          localStorage.setItem("cart", JSON.stringify(dbCart));
        } else {
          setCart([]);
          localStorage.setItem("cart", JSON.stringify([]));
        }
      } else {
        setCart(storedCart);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
      setCart(storedCart);
    }
  };


  const updateCart = (updatedProduct: Product) => {
    const updatedCart = cart.map((item) =>
      item.productid === updatedProduct.productid ? updatedProduct : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };


  const addToCart = (product: Product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const totalPrice = cart.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);
  useEffect(() => {
    loadCart();
  }, [provider.user]); 

  return (
    <CartContext.Provider value={{ cart,setCart, addToCart, updateCart, loadCart ,totalPrice}}>
      {children}
    </CartContext.Provider>
  );
};
