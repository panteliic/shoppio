import Nav from "./Components/Nav"
import { useProvider } from "./Context/Provider"
function App() {
  const provider = useProvider();
  return (
    <div className="text-xl">
      <Nav/>
    </div>
  )
}

export default App
