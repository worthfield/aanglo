import React from "react";
import { Link } from "react-router-dom";
const Suggestions = (props) => {
  return (
    <>
      {props.products.map((item, i) => {
        return (
          <div key={i}>
            {/* <img src={`/api/product/photo/${item._id}`} /> */}
            <Link to={`/product/${item._id}`}>{item.name}</Link>
            {/* <Link to={`/shops/${item.shop._id}`}>{item.shop.name}</Link> */}
          </div>
        );
      })}
    </>
  );
};

export default Suggestions;
