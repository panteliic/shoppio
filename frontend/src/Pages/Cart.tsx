import CartList from "@/Components/CartList";
import Nav from "@/Components/Nav";
import { Button } from "@/Components/ui/button";
import cartIcon from "@/assets/shopping_cart_dark.svg";
import { useState } from "react";
import Summary from "@/Components/Summary";

function Cart() {
  const [products, setProdacts] = useState<number>(1);
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Nav />
      <div className=" container m-auto lg:py-5 h-full ">
        {products == 0 ? (
          <div className="flex items-center justify-center flex-col gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img src={cartIcon} alt="" />
            <h1 className="text-xl font-bold">No items yet? Continue shopping to explore more.</h1>
            <Button className="text-lg p-5">
              <a href="/">Explore items</a>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col justify-between items-start gap-2 lg:flex-row ">
            <CartList/>
            <Summary/>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
