import { Button } from "./ui/button";

function Checkout() {
  return (
    <div className="w-full border-t-2 lg:border-2 rounded p-5 flex flex-col gap-5 lg:w-1/3">
      <h1 className="text-xl font-bold mb-4">Summary</h1>
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Total</h2>
        <h2 className="text-xl font-semibold">129.999,00 RSD</h2>
      </div>
      <a href="/account/login" className="text-blue-700 underline text-xl">
        Login or register for easy shopping
      </a>
      <Button className="">Buy now</Button>
    </div>
  );
}

export default Checkout;
