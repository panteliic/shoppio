import React, { useEffect } from "react";
import CratItem from "./CratItem";
import { useCart } from "../Context/CartProvider"; 

function CartList() {
  const { cart, loadCart } = useCart(); 
  console.log(cart)
  useEffect(() => {
    loadCart();
  }, [localStorage.getItem("cart")]);

  return (
    <div className="p-1 lg:p-5 w-full lg:w-2/3 rounded shadow-xl">
      <h1 className="text-2xl font-bold mb-5">Shopping Cart</h1>

      <div className="flex flex-col gap-2 lg:gap-0">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((product) => (
            <CratItem key={product.productid} {...product} />
          ))
        )}
      </div>
    </div>
  );
}

export default CartList;
