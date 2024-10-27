import { Button } from "./ui/button"

function ProductCard() {
  return (
    <div className="w-full  md:w-1/3 flex flex-col items-center justify-center p-5 shadow">
        <img src="/iphone.jpg" alt="product image"  className="w-1/2"/>
        <div className="text-center flex flex-col gap-5">
            <p className="font-bold text-sm "> APPLE iPhone 15 Plus 6/256GB Yellow MU1D3SX/A</p>
            <p className="font-bold text-xl">129.999,00 RSD</p>
            <Button className="w-full">Add to cart</Button>
        </div>
    </div>
  )
}

export default ProductCard
