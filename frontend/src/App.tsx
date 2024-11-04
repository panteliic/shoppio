import { useEffect } from "react";
import Nav from "./Components/Nav"
import ProductsList from "./Components/ProductsList";

import api from "./api";
function App() {
  useEffect(() => {
    async function proba() {
      try {
        await api.get('/proba');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    proba();
  }, []);
  return (
    <div className="text-xl overflow-x-hidden bg-gray-200 min-h-screen">
      <Nav/>
      <ProductsList/>
    </div>
  )
}

export default App
