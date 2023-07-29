import formidable from "formidable";
import Shop from "../models/shop_models.js";
import fs from "fs";
import errorMessage from "../handlers/dbErrorHandler.js";
import path from "path";
import extend from 'lodash/extend.js'

import { fileURLToPath } from "url";
import { dirname } from "path";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);

const profileImage = path.join(
  currentDir,
  "../../client/src/assets/images/storeIcon.jpg"
);
const create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: "Image could not be uploaded",
      });
    }
    let shop = new Shop(fields);
    shop.owner = req.profile;
    if (files.photo) {
      const imageFormat = files.photo.mimetype; // Get the image format
      // Check the image format
      if (imageFormat !== 'image/jpg' && imageFormat !== 'image/jpeg' && imageFormat !== 'image/png') {
        return res.status(400).json({
          error: "Invalid image format. Only JPEG and PNG formats are supported.",
        });
      }
      shop.photo.data = fs.readFileSync(files.photo.filepath);
      shop.photo.contentType = files.photo.mimetype;
    }
    try{

      await shop.save();
      return res.status(200).json({
        message:"Successfully register."
      })
    }
    catch(err){
      return res.status(400).json(
        {
          error:errorMessage(err)
        }
      )
    }

 
  });
};

const shopByID = async (req, res, next, id) => {
  try {
    let shop = await Shop.findById(id).populate("owner", "_id name").exec();
    if (!shop)
      return res.status("400").json({
        error: "Shop not found",
      });
    req.shop = shop;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve shop",
    });
  }
};


const list = async(req,res)=>{
  try{
    let shops = await Shop.find();
    res.json(shops)
  }
  catch(err){
    return res.status(400).json({
      error:errorMessage(err)
    })
  }
}

const listByOwner = async(req,res)=>{
  try{
    let shops = await Shop.find({owner:req.profile._id}).populate('owner','_id name')
    res.json(shops)
  }
  catch(err){
    return res.status(400).json({
      error:errorMessage(err)
    })
  }
}

const read = (req,res)=>{
  req.shop.photo = undefined
  return res.json(req.shop)
}

const update = (req,res)=>{
  let form = new formidable.IncomingForm();
  form.keepExtensions=true
  form.parse(req,async(err,fields,files)=>{
    if(err){
      res.status(400).json({
        message:"Photo could not be uploaded"
      })
    }
    let shop = req.shop;
    shop = extend(shop,fields)
    shop.updated = Date.now()
    if(files.photo){
      shop.photo.data = fs.readFileSync(files.photo.filepath)
      shop.photo.contentType = files.photo.mimetype
    }
    try{
      let result = await shop.save();
      res.json(result)
    }
    catch(err){
      return res.status(400).json({
        error:errorMessage(err)
      })
    }
  })

}

const isOwner = async(req,res,next)=>{
  const isOwner = req.shop && req.auth && req.shop.owner._id == req.auth._id;
  if(!isOwner){
    return res.status(403).json({
      error:"User is not authorized."
    })
  }
  next()

}

const remove = async (req, res) => {
  try {
    let shop = req.shop
    let deletedShop = shop.remove()
    res.json(deletedShop)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }  
}


const photo = (req, res, next) => {
  if (req.shop.photo.data) {
    res.set("Content-Type", req.shop.photo.contentType);
    return res.send(req.shop.photo.data);
  }
  next();
};
const defaultPhoto = (req, res) => {
  return res.sendFile(profileImage);
};

export default { create, shopByID, photo, defaultPhoto,list,listByOwner,read,update,isOwner, remove };
