import User from "../models/user_models.js";
import errorMessage from "../handlers/dbErrorHandler.js";
import nodemailer from "nodemailer";
import extend from "lodash/extend.js";
import fs from "fs";
import path from "path";
import formidable from "formidable";
import { fileURLToPath } from "url";
import { dirname } from "path";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);

const profileImage = path.join(
  currentDir,
  "../../client/src/assets/images/profileIcon.jpg"
);
const create = async (req, res) => {
  const { email } = req.body;
  const verificationCode = generateVerificationCode();
  console.log(req.body)
  let user = new User(req.body);
  try {
    user.verificationCode = verificationCode;
    user.verificationCodeExpires = Date.now() + 2 * 60 * 1000;

    await user.save();
    sendVerificationEmail(email, verificationCode);
    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorMessage(err),
    });
  }
};

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
const sendVerificationEmail = (email, verificationCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.REACT_APP_USER_EMAIL,
      pass: process.env.REACT_APP_USER_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.REACT_APP_USER_EMAIL,
    to: email,
    subject: "Email Verification",
    text: `Your verification code is: ${verificationCode}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const verify = async (req, res) => {
  const { email, verificationCode } = req.body;
  try {
    const user = await User.findOne({ email, verificationCode });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Verification Code.",
      });
    }
    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();
    res.status(200).json({
      message: "Verification successful",
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

const list = async (req, res) => {
  try {
    const user = await User.find().select("_id name email created ");
    if (user.length == 0) {
      return res.send("No User found.");
    }
    return res.json(user);
  } catch (error) {
    return res.json({ error: error });
  }
};

const userById = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve user.",
    });
  }
};

const read = async (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};
const update = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded",
      });
    }
    let user = req.profile;
    user = extend(user, fields);
    user.updated = Date.now();
    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo.filepath);
      user.photo.contentType = files.photo.mimetype;
    }
    try {
      await user.save();
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    } catch (error) {
      return res.status(400).json({
        error: errorMessage(error),
      });
    }
  });
};


const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.deleteOne();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    // deletedUser.isVerified=false;
    return res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorMessage(err),
    });
  }
};

const photo = (req, res, next) => {
  if (req.profile.photo.data) {
    res.set("Content-Type", req.profile.photo.contentType);
    return res.send(req.profile.photo.data);
  }
  next();
};

const defaultPhoto = (req, res) => {
  // console.log(process.cwd()+profileImage)

  
  return res.sendFile(profileImage);
};
const isSeller = (req,res,next)=>{
  const isSeller = req.profile && req.profile.seller
  if(!isSeller){
    return res.status(403).json({
      error:"User is not a seller"
    })
  }
  next()
}


export default {
  create,
  verify,
  list,
  read,
  update,
  remove,
  userById,
  defaultPhoto,
  photo,
  isSeller
};
