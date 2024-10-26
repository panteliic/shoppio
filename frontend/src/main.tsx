import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login.tsx";
import Register from "./Pages/Register.tsx";
import ProductDetails from "./Pages/ProductDetails.tsx";
import Cart from "./Pages/Cart.tsx";
import Provider from "./Context/Provider.tsx";
import { CookiesProvider } from "react-cookie";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/account/login",
    element: <Login />,
  },
  {
    path: "/account/register",
    element: <Register />,
  },
  {
    path: "/product-details/:productId",
    element: <ProductDetails />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <CookiesProvider>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </CookiesProvider>
);
