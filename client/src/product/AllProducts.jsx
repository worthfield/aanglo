import React, { useEffect, useState } from "react";
import { allProducts } from "../apis/product-api";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const data = await allProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(products)

  return <div>{products.map((product)=>{
    return (
      <div key={product._id}>{product.name}</div>
    )
  })}</div>;
};

export default AllProducts;
