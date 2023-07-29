import React from "react";
import "./App.css";
import {
  Route,
  RouterProvider,
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
import AllProducts from './product/AllProducts'
import Cart from './cart/Cart'
import ShopOrders from './order/ShopOrders'
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
      </Route>

      {/* store */}

      <Route
        path="shops"
        element={<Shops />}
      />

      <Route path="shops/:shopId" element={<Store />} />

      <Route
        path="seller/shops"
        element={<SellerLayout />}
        loader={async ({request}) => {
          return await sellerAuth(request);
        }}
      >
        <Route index element={<MyStore />} />
        <Route path="new" element={<NewStore />} />
        <Route path=":shopId/products/new" element={<NewProduct />} />
        <Route path="edit/:shopId" element={<EditStore />} />
      </Route>
      {/* product */}
      <Route path="/product/:productId" element={<Product />} />
      <Route path="product" element={<AllProducts/>}/>

      {/* cart */}
      <Route path="/cart" element={<Cart />} />

      <Route path="/seller/orders/:shop/:shopId" element={<ShopOrders />} />

    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
