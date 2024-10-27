import ProductCard from "./ProductCard"

function ProductsList() {
  return (
    <div className="container m-auto mt-8 flex flex-wrap justify-start overflow-x-hidden ">
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
    </div>
  )
}

export default ProductsList
