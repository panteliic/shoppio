import Nav from "./Components/Nav"
import ProductsList from "./Components/ProductsList";
import { useProvider } from "./Context/Provider"
function App() {
  const provider = useProvider();
  return (
    <div className="text-xl">
      <Nav/>
      <ProductsList/>
    </div>
  )
}

export default App
