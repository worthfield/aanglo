import errorMessage from "../handlers/dbErrorHandler.js";
import { Order, CartItem } from "../models/order_models.js";
const create = async (req, res) => {
  try {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    let result = await order.save();
    res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorMessage(err),
    });
  }
};

const listByShop = async (req, res) => {
  try {
    let orders = await Order.find({ "products.shop": req.shop._id })
      .populate({ path: "products.product", select: "_id name price" })
      .sort("-created")
      .exec();
    res.json(orders);
  } catch (err) {
    return res.status(400).json({
      error: errorMessage(err),
    });
  }
};
const getStatusValues = (req,res)=>{
    res.json(CartItem.schema.path('status').enumValues)
}
const update = async (req, res) => {
    console.log(req.body.amount)
    try {
      let order = await Order.updateOne({'products._id':req.body.cartItemId}, {'$set': {
          'products.$.status': req.body.status
      }})
      console.log(order)
        res.json(order)
    } catch (err){
      return res.status(400).json({
        error: errorMessage(err)
      })
    }
  }
  const orderByID = async (req, res, next, id) => {
    try {
      let order = await Order.findById(id).populate('products.product', 'name price').populate('products.shop', 'name').exec()
      if (!order)
        return res.status('400').json({
          error: "Order not found"
        })
      req.order = order
      next()
    } catch (err){
      return res.status(400).json({
        error: errorMessage(err)
      })
    }
  }
  
export default { create, listByShop,getStatusValues,update,orderByID };
