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
const getStatusValues = async(req, res) => {
  return res.json(CartItem.schema.path("status").enumValues);
};
const update = async (req, res) => {
  try {
    let order = await Order.updateOne(
      { "products._id": req.body.cartItemId },
      {
        $set: {
          "products.$.status": req.body.status,
        },
      }
    );
    res.json(order);
  } catch (err) {
    return res.status(400).json({
      error: errorMessage(err),
    });
  }
};
const orderByID = async (req, res, next, id) => {
  try {
    let order = await Order.findById(id)
      .populate("products.product", "name price")
      .populate("products.shop", "name")
      .exec();
    if (!order)
      return res.status(400).json({
        error: "Order not found",
      });
    req.order = order;
    next();
  } catch (err) {
    return res.status(400).json({
      error: errorMessage(err),
    });
  }
};

const listByUser = async (req, res) => {
  try {
    const order = await Order.find({ "user": req.profile._id })
      .sort("-created")
      .exec();
    return res.json(order);
  } catch (error) {
    return res.status(400).json({
      error: errorMessage(error),
    });
  }
};
const read = async(req,res)=>{
  return res.json(req.order)
}
export default {
  create,
  listByShop,
  getStatusValues,
  update,
  orderByID,
  listByUser,
  read
};
