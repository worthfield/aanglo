import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { listByShop } from '../apis/order-api'
import auth from '../authentication/auth-helper'
import ProductOrderEdit from './ProductOrderEdit'

const ShopOrders = () => {
  const [orders, setOrders] = useState([])
  const [open, setOpen] = useState(0)
  const params = useParams();


    const jwt = auth.isAuthenticated()
    useEffect(() => {
      fetchOrder()
    }, [])
    const fetchOrder = async()=>{
      try {
        const data = await listByShop({shopId:params.shopId},{t:jwt.token})
        setOrders(data)
        
      } catch (error) {
        if(error.response){
          console.log(error.response.data.error)
        }
        
      }
    }

  const handleClick = index => event => {
    setOpen(index)
  }

  const updateOrders = (index, updatedOrder) => {
    let updatedOrders = orders
    updatedOrders[index] = updatedOrder
    setOrders([...updatedOrders])
  }

  return (
<div>
  <div >
    <h3>
      Orders in {params.shop}
    </h3>
    <ul>
      {orders.map((order, index) => (
        <div key={index}>
          <li onClick={handleClick(index)}>
            <h4>{'Order # ' + order._id}</h4>
            {open == index ? <span>ExpandLess</span> : <span>ExpandMore</span>}
          </li>
          <hr />
          <ProductOrderEdit shopId={params.shopId} order={order} orderIndex={index} updateOrders={updateOrders}/>

          {open == index && (
            <div>
              <h3>Deliver to:</h3>
              <h3>
                <strong>{order.customer_name}</strong> ({order.customer_email})
              </h3>
              <h3>{order.delivery_address.street}</h3>
              <h3>
                {order.delivery_address.city}, {order.delivery_address.state} {order.delivery_address.zipcode}
              </h3>
              <h3>{order.delivery_address.country}</h3>
              <br />
            </div>
          )}
          <hr />
        </div>
      ))}
    </ul>
  </div>
</div>

  )
}

export default ShopOrders