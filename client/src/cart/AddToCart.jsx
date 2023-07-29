import React,{useState,useContext} from "react";
import { Navigate } from "react-router-dom";
import cart from '../apis/cart-api'
import { MyContext } from "../Context-api";

const AddToCart = (props) => {
  const [redirect, setRedirect] = useState(false);

  const addToCart = () => {
    cart.addItem(props.item, () => {
      setRedirect({redirect:true})
    })
  }
  if (redirect) {
    return <Navigate to={"/cart"} />;
  }
  return (
    <span>
      {props.item.quantity >= 0 ?
        <button onClick={addToCart}>
          add to cart
        </button> :
        <button >
          disabled
        </button>}
      </span>
    // <div>
    //   {props.item.quantity >= 0 && <button onClick={()=>{addToCarts(props.item)}}>add to cart</button>}
    // </div>
  );
};

export default AddToCart;
