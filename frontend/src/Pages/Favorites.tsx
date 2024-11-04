import api from "@/api";
import Nav from "@/Components/Nav";
import ProductCard from "@/Components/ProductCard";
import { useEffect, useState } from "react";
interface Product {
  productid: number;
  name: string;
  image: string;
  price: number;
}

function Favorites() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("http://localhost:5500/api/favoriteProducts", {
        withCredentials: true,
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <Nav />
      <div className="container m-auto mt-8  ">
        <h1 className="text-2xl font-medium">Favorites product</h1>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard
                key={index}
                productId={product.productid}
                name={product.name}
                image={product.image}
                price={product.price}
                isFavorite={true}
              />
            ))
          ) : (
            <p>No favorites products available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
