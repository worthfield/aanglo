import React, { useEffect, useState } from "react";
import { listByShop } from "../apis/product-api";
import ProductList from "./ProductList";
const MyProducts = (props) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchList();
  }, []);
  const fetchList = async () => {
    try {
      const data = await listByShop({ shopId: props.shopId });
      setProducts(data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.error);
      }
    }
  };
  const removeProduct = (product) => {
    const updatedProducts = [...products];
    const index = updatedProducts.indexOf(product);
    setProducts(updatedProducts);
  };
  const logo = "//";
  return (
    //   <Link to={"/seller/" + props.shopId + "/products/new"}>New Product</Link>
    // <div>
    //   {products.map((product, i) => {
    //         return <span key={i}>
    //           <div>
    //             <img
    //               src={'/api/product/photo/'+product._id+"?" + new Date().getTime()}
    //             />
    //             <div >
    //               <p>
    //                 {product.name}
    //               </p>
    //               <p>
    //                 Quantity: {product.quantity} | Price: ${product.price}
    //               </p>
    //             </div>
    //             <div>
    //               <Link to={"/seller/"+product.shop._id+"/"+product._id+"/edit"}>
    //                   Edit
    //               </Link>
    //               {/* <DeleteProduct
    //                 product={product}
    //                 shopId={props.shopId}
    //                 onRemove={removeProduct}/> */}
    //             </div>
    //           </div>
    //           <br/></span>})}
    // </div>
    <div className="mt-[36px]">
      <p className="mb-2 font-bold text-2xl italic">Your products</p>
      {products.map((product, i) => {
        return <ProductList key={i} product={product} />;
      })}
    </div>

  );
};

export default MyProducts;
