import React, { useContext } from "react";
import "./App.css";
import {
  Route,
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Signup from "./user/Signup";
import Home from "./container/Home";
import Signin, {
  loader as signinLoader,
  action as signinAction,
} from "./authentication/Signin";
import MyStore, { loader as myStoreLoader } from "./store/MyStore";
import Shops, { loader as shopLoader } from "./store/Shops";
import Store, { loader as storeLoader } from "./store/Store";
import EditStore from "./store/EditStore";
import NewStore from "./store/NewStore";
import ProfileLayout, {
  loader as profileLoader,
} from "./layouts/ProfileLayout";
import EditProfile from "./user/EditProfile";
import NewProduct from "./product/NewProduct";
import SellerLayout from "./layouts/SellerLayout";
import { requireAuth, sellerAuth } from "./utils";
import Product from "./product/Product";
import Cart from "./cart/Cart";
import ShopOrders from "./order/ShopOrders";
import MyOrder from "./order/MyOrder";
import Order from "./order/Order";
import Error from "./components/Error";
import Searches from './product/Searches'
import EditProduct from "./product/EditProduct";
const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route path="/" element={<MainLayout />}>
   
      <Route index element={<Home />} />

      {/* user */}
      <Route path="signup" element={<Signup />} />
      <Route
        path="signin"
        element={<Signin />}
        loader={signinLoader}
        action={signinAction}
      />
      <Route
        path="/user/:userId"
        element={<ProfileLayout />}
        loader={profileLoader}
      >
        <Route
          index
          element={<EditProfile />}
          loader={async () => {
            return await requireAuth();
          }}
        />
        <Route path="myorders" element={<MyOrder />} />
      </Route>
      <Route path="/order/:orderId" element={<Order />} />

      {/* store */}

      <Route path="shops" element={<Shops />} />

      <Route path="shops/:shopId" element={<Store />} />

      <Route
        path="seller/shops"
        element={<SellerLayout />}
        loader={async ({ request }) => {
          return await sellerAuth(request);
        }}
      >
        <Route index element={<MyStore />} />
        <Route path="new" element={<NewStore />} />
        <Route path=":shopId/products/new" element={<NewProduct />} />
        <Route path="edit/:shopId" element={<EditStore />} />
        <Route path="edit/:shopId/:productId" element={<EditProduct/>}/>
      </Route>
      {/* product */}
      <Route path="/product/:productId" element={<Product />} />
      
      <Route path="search" element={<Searches/>}/> 

      {/* cart */}
      <Route path="/cart" element={<Cart />} />

      <Route path="/seller/orders/:shop/:shopId" element={<ShopOrders />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
