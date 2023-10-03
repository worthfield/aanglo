import formidable from "formidable";
import fs from "fs";
import Product from "../models/product_models.js";
import errorMessage from "../handlers/dbErrorHandler.js";
import path from "path";
import extend from "lodash/extend.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);

const profileImage = path.join(
  currentDir,
  "../../client/src/assets/images/productIcon.jpg"
);
const create = async (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: "Photo could not be uploaded",
      });
    }
    let product = new Product(fields);
    product.shop = req.shop;
    if (files.photo) {
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.mimetype;
    }
    try {
      let result = await product.save();
      res.json(result);
    } catch (err) {
      return res.status(400).json({
        error: errorMessage(err),
      });
    }
  });
};
const listByShop = async (req, res) => {
  try {
    let products = await Product.find({ shop: req.shop._id })
      .populate("shop", "_id name")
      .select("-photo");
    res.json(products);
  } catch (err) {
    return res.status(400).json({
      error: errorMessage(err),
    });
  }
};

// const slug = async(req,res,next,slug)=>{
//   try {
//     let product = await Product.findOne({slug})
//   } catch (error) {

//   }
// }

const productByID = async (req, res, next, id) => {
  try {
    let product = await Product.findById(id).populate("_id name").exec();
    if (!product) {
      return res.status(400).json({
        error: "Shop not found",
      });
    }
    req.product = product;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve shop",
    });
  }
};

const listLatest = async (req, res) => {
  try {
    let products = await Product.find({})
      .sort("-created")
      .limit(5)
      .populate("shop", "_id name")
      .exec();
    res.json(products);
  } catch (err) {
    return res.status(400).json({
      error: errorMessage(err),
    });
  }
};

const listRelated = async (req, res) => {
  try {
    let products = await Product.find({
      _id: { $ne: req.product },
      category: req.product.category,
    })
      .limit(5)
      .populate("shop", "_id name")
      .exec();
    res.json(products);
  } catch (error) {
    return res.status(400).json({
      error: errorMessage(error),
    });
  }
};

const read = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId)
      .populate("shop", "_id name description")
      .exec();

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Modify the product object as needed
    product.photo = undefined;

    // Return the modified product object in the response
    return res.json(product);
  } catch (error) {
    return res.status(400).json({ error: "Failed to retrieve product" });
  }
};

const listCategories = async (req, res) => {
  try {
    const products = await Product.distinct("category", {});
    res.json(products);
  } catch (error) {
    return res.status(400).json({
      error: errorMessage(error),
    });
  }
};

const list = async (req, res) => {
  const obj = req.query;

  const query = {};
  if (req.query.search)
    query.name = { $regex: req.query.search, $options: "i" };
  if (req.query.category && req.query.category != "All")
    query.category = req.query.category;

  if (obj.minPrice && obj.maxPrice) {
    query.price = {
      $gte: parseFloat(req.query.minPrice),
      $lte: parseFloat(req.query.maxPrice),
    };
  }
  try {
    let products = await Product.find(query)
      .populate("shop", "_id name")
      .select("-image")
      .exec();
    res.json(products);
  } catch (error) {
    return res.status(400).json({
      error: errorMessage(error),
    });
  }
};

const decreaseQuantity = async (req, res, next) => {
  console.log(req.body);
  let bulkOps = req.body.order.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.quantity } },
      },
    };
  });
  try {
    await Product.bulkWrite(bulkOps, {});
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not update product",
    });
  }
};

const increaseQuantity = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndUpdate(
      req.product._id,
      { $inc: { quantity: req.body.quantity } },
      { new: true }
    ).exec();
    next();
  } catch (error) {
    return res.status(400).json({
      error: errorMessage(error),
    });
  }
};
const remove = async (req, res) => {
  try{
    let product = req.product
    let deletedProduct = await product.deleteOne()
    res.json(deletedProduct)
  
  } catch (err) {
    return res.status(400).json({
      error: errorMessage(err)
    })
  }
}
const update = async(req,res)=>{
  let form = new formidable.IncomingForm();
  form.keepExtensions=true;
  form.parse(req,async(err,fields,files)=>{
    if(err){
      res.status(400).json({
        message:"Photo could not be uploaded"
      })
    }
    let product = req.product;
    product = extend(product,fields);
    product.updated=Date.now();
    if (files.photo) {
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.mimetype;
    }
    try {
      let result = await product.save();
      res.json(result);
    }
    catch (err) {
      return res.status(400).json({
        error: errorMessage(err),
      });
    }

  })

}


const photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};
const defaultPhoto = (req, res) => {
  return res.sendFile(profileImage);
};

export default {
  create,
  listByShop,
  photo,
  defaultPhoto,
  productByID,
  listLatest,
  listRelated,
  read,
  listCategories,
  list,
  decreaseQuantity,
  increaseQuantity,
  remove,
  update
};
