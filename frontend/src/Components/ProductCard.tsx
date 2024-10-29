import { Button } from "./ui/button";

interface ProductCardProps {
  name: string;
  image: string;
  price: number;
}

function ProductCard({ name, image, price }: ProductCardProps) {
  return (
    <div className="flex flex-col items-center justify-between p-5 bg-background shadow-lg rounded-lg">
      <img src={image} alt={name} className="w-1/2 h-auto mb-4 object-cover" />
      <div className="text-center flex flex-col justify-center items-center gap-3">
        <p className="font-bold text-lg">{name}</p>
        <p className="font-bold text-xl mb-5">{price.toFixed(2)} RSD</p>
      </div>
      <Button className="w-3/4">Add to cart</Button>
    </div>
  );
}

export default ProductCard;
