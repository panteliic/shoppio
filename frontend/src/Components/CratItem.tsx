import React from "react";
import { useCart } from "../Context/CartProvider"; 
import api from "@/api";
import close from "../assets/close.svg";
import { useProvider } from "@/Context/Provider";

interface Props {
  productid: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

function CratItem(props: Props) {
  const { productid, name, image, quantity, price } = props;
  const { updateCart } = useCart();
  const provider = useProvider();
  
  const update = async (action: string) => {  
    let newQuantity = quantity;

    if (action === "increment") newQuantity += 1;
    else if (action === "decrement" && quantity > 1) newQuantity -= 1;
    else if (action === "remove") newQuantity = 0;
    try {
      const updatedProduct = { ...props, quantity: newQuantity };
      updateCart(updatedProduct); 

      if(provider.user) {
        await api.put(
          "/api/updateCartItem",
          {productid: productid, action: newQuantity === 0 ? "remove" : newQuantity > quantity ? "increment" : "decrement" },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
      }

      const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = cartFromLocalStorage.map((item: Props) =>
        item.productid === productid ? updatedProduct : item
      );
      console.log(newQuantity);
      if (newQuantity === 0) {
        
        console.log("Product ID to remove:", productid);
        const filteredCart = updatedCart.filter((item: Props) => {
          console.log("Item ID:", item.productid);
          return item.productid !== productid;
        });
        console.log("Filtered Cart:", filteredCart);
        
        localStorage.setItem("cart", JSON.stringify(filteredCart));
        
      } else {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  return (
    <div className="w-full lg:p-2 flex justify-between items-center">
      <img src={image} alt={name} className="w-1/5" />
      <p className="text-wrap w-1/3 font-bold text-sm md:text-base">{name}</p>
      
      <div className="w-1/6 rounded-full border-2 flex justify-between p-1 items-center">
        <h1 className="text-3xl cursor-pointer" onClick={() => update("decrement")}>
          -
        </h1>
        <h1 className="text-3xl">{quantity}</h1>
        <h1 className="text-3xl cursor-pointer" onClick={() => update("increment")}>
          +
        </h1>
      </div>

      <h1 className="font-semibold text-sm text-wrap">
        {new Intl.NumberFormat("sr-RS").format(price * quantity)} RSD
      </h1>
      
      <img 
        src={close} 
        alt="close img" 
        className="cursor-pointer" 
        onClick={() => update("remove")} 
      />
    </div>
  );
}

export default CratItem;
