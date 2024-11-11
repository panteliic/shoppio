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
import Favorites from "./Pages/Favorites.tsx";
import { FavoritesProvider } from "./Context/FavoritesProvider.tsx";
import { CartProvider } from "./Context/CartProvider.tsx";
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
  {
    path: "/favorites",
    element: <Favorites />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <CookiesProvider>
    <Provider>
      <CartProvider>
        <FavoritesProvider>
          <RouterProvider router={router} />
        </FavoritesProvider>
      </CartProvider>
    </Provider>
  </CookiesProvider>
);
