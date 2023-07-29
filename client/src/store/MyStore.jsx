import React, { useEffect, useState, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { listByOwner } from "../apis/store-api";
import auth from "../authentication/auth-helper";
import StoreList from "./StoreList";
import store_banner from "../assets/images/store_banner.jpg";
import Loading from "../components/Loading";



const MyStore = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const jwt = auth.isAuthenticated();

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const fetchData = async () => {
    try {
      const data = await listByOwner(
        { userId: jwt.user._id },
        { t: jwt.token }
      );
      setShops(data);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.error);
        setLoading(false);
        setRedirectToSignin(true);
      }
    }
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };
  //   const removeShop = (shop) => {
  //     const updatedShops = [...shops];
  //     const index = updatedShops.indexOf(shop);
  //     updatedShops.splice(index, 1);
  //     setShops(updatedShops);
  //   };
  if (redirectToSignin) {
    return <Navigate to="/signin" />;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-4 mt-[24px]">
        <div className="bg-red-400 h-[400px] lg:h-[400px] rounded-lg md:h-[300px] col-span-2 md:col-span-1">
          <img
            className="w-full h-full object-cover bg-center rounded-lg bg-cover"
            src={store_banner}
            alt="store banner"
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <div className="grid gap-2 mt-1  grid-cols-1 w-full sm:grid-cols-2">
            <Link
              to={"new"}
              className="bg-[#fc3b40] text-xl text-white rounded-lg w-full h-full text-center py-[30px] px-[30px] "
            >
              + Create a new store
            </Link>
            <Link className="bg-[#fd630b] text-xl text-white rounded-lg w-full h-full text-center py-[30px] px-[30px] ">
              Find amazing deal with us
            </Link>
            <Link className="bg-green-500 text-xl text-white rounded-lg w-full h-full text-center py-[30px] px-[30px] ">
              Checkout your orders
            </Link>
            <Link className="bg-[#709b9e] text-xl text-white rounded-lg w-full h-full text-center py-[30px] px-[30px] ">
              Add new product on your store
            </Link>
          </div>
        </div>
      </div>
      <p className="mt-[30px] mb-[16px] text-xl italic font-bold">
        List of your shop
      </p>

      {shops.length >= 1 ? (
        shops.map((shop, i) => <StoreList key={i} shop={shop} />)
      ) : (
        <div className="font-bold italic bg-red-300 p-2 text-center text-2xl rounded-lg mb-2">
          Create amazing store with us.
        </div>
      )}
    </div>
  );
};

export default MyStore;
