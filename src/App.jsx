import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/Notfound/Notfound';
import UserContextProvider from './Context/UserContext';
import ProtectedRout from './Components/ProtectedRout/ProtectedRout';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import WishList from './Components/WishList/WishList';
import WishListContextProvider from './Context/WishlistContext';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';


let query = new QueryClient

let routing = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [
      { index: true, element: <ProtectedRout> <Home /> </ProtectedRout> },
      { path: "cart", element: <ProtectedRout>  <Cart />  </ProtectedRout> },
      { path: "forgetpassword", element: <ForgetPassword /> },
      { path: "resetpassword", element: <ResetPassword /> },
      { path: "products", element: <ProtectedRout>  <Products />  </ProtectedRout> },
      { path: "categories", element: <ProtectedRout>  <Categories />  </ProtectedRout> },
      { path: "productdetails/:id", element: <ProtectedRout>  <ProductDetails />  </ProtectedRout> },
      { path: "wishlist", element: <ProtectedRout>  <WishList />  </ProtectedRout> },
      { path: "brands", element: <ProtectedRout>  <Brands />  </ProtectedRout> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ]
  },

])

function App() {


  return <>
    <UserContextProvider>
      <QueryClientProvider client={query}>
        <CartContextProvider>
          <WishListContextProvider>
            <RouterProvider router={routing}></RouterProvider>
          </WishListContextProvider>
        </CartContextProvider>
        <Toaster />
      </QueryClientProvider>
    </UserContextProvider>

  </>

}

export default App
