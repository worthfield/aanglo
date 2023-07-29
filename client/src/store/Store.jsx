import React, { useEffect, useState } from "react";
import { Link, useParams, useLoaderData } from "react-router-dom";
import { listByShop } from "../apis/product-api";
import { read } from "../apis/store-api";
import Products from "../product/Products";
import Loading from "../components/Loading";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [store, setStore] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    setLoading(true)
    fetchStoreAndProduct();
  }, []);

  const fetchStoreAndProduct = async () => {
    try {
      // Fetch store and product data simultaneously
      const [storeData, productData] = await Promise.all([
        read({ shopId: params.shopId }),
        listByShop({ shopId: params.shopId }),
      ]);

      setStore(storeData);
      setProducts(productData);
      setLoading(false); // Set loading to false after both data are fetched
    } catch (error) {
      console.log(error);
      setLoading(false); // Handle errors by setting loading to false
    }
  };
  const logoUrl = store._id
    ? `/api/shops/logo/${store._id}?${new Date().getTime()}`
    : `/api/shops/defaultphoto`;

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container bg-white mx-auto">
      <div className="flex items-center rounded-lg w-full bg-gray-100 mb-2 mt-2 px-4 py-4 gap-4">
        <div className="logo w-[75px] h-[75px] sm:w-[100px] sm:h-[100px] rounded-full">
          <img
            src={logoUrl}
            alt={store.name}
            className="object-cover bg-cover rounded-full bg-center w-full h-full"
          />
        </div>
        <div className="p">
          <p className="text-2xl md:text-3xl">{store.name}</p>
          <p className="text-gray-400">100% positive response</p>
        </div>
      </div>

      <Products products={products} searched={false} />
    </div>
  );
};

export default Store;
