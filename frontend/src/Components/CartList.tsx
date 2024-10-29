import CratItem from "./CratItem";

function CartList() {
  return (
    <div className="p-1 lg:p-5 w-full lg:w-2/3 rounded shadow-xl">
      <h1 className="text-2xl font-bold mb-5">Shopping Cart </h1>

      <div className="flex flex-col gap-2 lg:gap-0">
        <CratItem />
        <CratItem />
        <CratItem />
      </div>
    </div>
  );
}

export default CartList;
