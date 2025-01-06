import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Cart from "./Pages/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Notfound from "./Pages/Notfound/Notfound";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import TokenContextProvider from "./Components/Context/TokenContext/Token.Context";
import { CartProvider } from "./Components/Context/CartContext/Cart.Context";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Checkout from "./Pages/Checkout/Checkout";
import AllOrders from "./Pages/Orders/AllOrders";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CategoryDetails from "./Pages/CategoryDetails/CategoryDetails";
import Products from "./Pages/Products/Products";
import Brands from "./Pages/Brands/Brands";
import BrandDetails from "./Pages/BrandDetails/BrandDetails";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import VerifyCode from "./Pages/VerifyCode/VerifyCode";
import UpdatePassword from "./Pages/UpdatePassword/UpdatePassword";
import { WishlistProvider } from "./Components/Context/wishlist/wishlist";
import WishlistPage from "./Pages/WishlistPage/WishlistPage";

const reactQuery=new QueryClient();

console.log("hi",`${location.origin}/freshcart`);

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "/cart", element: <Cart /> },
        { path: "/wishlist", element: <WishlistPage /> },
        { path: "/brands", element: <Brands /> },
        { path: "/brands/:id", element: <BrandDetails /> },
        { path: "/categories", element: <Categories /> },
        { path: "/categories/:id", element: <CategoryDetails /> },
        { path: "/products", element: <Products /> },
        { path: "/product/:id", element: <ProductDetails /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/allorders", element: <AllOrders /> },
        { path: "*", element: <Notfound /> },
      ],
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/login", element: <Login /> },
        { path: "/forgetpassword", element: <ForgetPassword /> },
        { path: "/verifycode", element: <VerifyCode /> },
        { path: "/updatepassword", element: <UpdatePassword /> },
        { path: "/register", element: <Register /> },
      ],
    },
  ],
  // {basename:"/freshcart"}, // The basename is used when your project is published in a subdirectory and not in the root of the domain
);

  return (
    <>
    <QueryClientProvider client={reactQuery}>
    <TokenContextProvider>
      <WishlistProvider>
      <CartProvider>
        <RouterProvider router={router}  />
      </CartProvider>
      </WishlistProvider>
    </TokenContextProvider>
  <Toaster />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>

      
    </>
  );
}
