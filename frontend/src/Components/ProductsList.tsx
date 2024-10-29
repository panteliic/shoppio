import axios from "axios";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

interface Product {
  name: string;
  image: string;
  price: number;
}

function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/products", {
        withCredentials: true,
      });
      setProducts(response.data)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container m-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.length > 0 ? (
        products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            image={product.image}
            price={product.price}
          />
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}

export default ProductsList;
