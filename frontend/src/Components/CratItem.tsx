
import close from "@/assets/close.svg"
interface Props {
  name: string;
  image: string;
  quantity: string;
  price:number;
}

function CratItem(/*props : Props*/) {
  return (
    <div className="w-full lg:p-2 flex justify-between items-center">
      <img src="/iphone.jpg" alt="" className="w-1/5" />
      <p className="text-wrap w-1/3 font-bold text-sm md:text-base">
        APPLE iPhone 15 Plus 6/256GB Yellow MU1D3SX/A
      </p>
      <div className="w-1/6 rounded-full border-2 flex justify-between p-1 items-center">
        <h1 className="text-3xl cursor-pointer">-</h1>
        <h1 className="text-3xl">1</h1>
        <h1 className="text-3xl cursor-pointer">+</h1>
      </div>
      <h1 className="font-semibold text-sm text-wrap">129.999,00 RSD</h1>
      <img src={close} alt="close img" className=" cursor-pointer"/>
    </div>
  );
}

export default CratItem;
