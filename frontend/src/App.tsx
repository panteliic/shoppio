import { useEffect } from "react";
import Nav from "./Components/Nav"
import ProductsList from "./Components/ProductsList";
import { useProvider } from "./Context/Provider"
import api from "./api";
function App() {
  useEffect(() => {
    async function proba() {
      try {
        const response = await api.get('/proba');
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    proba();
  }, []);
  return (
    <div className="text-xl">
      <Nav/>
      <ProductsList/>
    </div>
  )
}

export default App
