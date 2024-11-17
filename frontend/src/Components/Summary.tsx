import { useProvider } from "@/Context/Provider";
import { Button } from "./ui/button";
import { useCart } from "@/Context/CartProvider";
import { useNavigate } from "react-router";
function Summary({ visible }: { visible: boolean }) {
  const provider = useProvider();
  const router =  useNavigate();
  const { cart } = useCart();
  const totalPrice = cart.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
  const Checkout = () => {
    router("/checkout")
  };

  return (
    <div className="w-full rounded p-5 flex flex-col justify-between gap-5 lg:w-1/3 shadow-xl">
      <h1 className="text-xl font-bold mb-4">Summary</h1>
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Total</h2>
        <h2 className="text-xl font-semibold">
          {new Intl.NumberFormat("sr-RS").format(totalPrice)} RSD
        </h2>
      </div>
      {!provider.user && (
        <a href="/account/login" className="text-blue-700 underline text-xl">
          Login or register for easy shopping
        </a>
      )}
      <Button className={visible ? 'visible' : "hidden"} onClick={Checkout}>
        Buy now
      </Button>
    </div>
  );
}

export default Summary;
