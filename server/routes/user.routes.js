import express from "express";
import userCtrl from "../controllers/user_controllers.js";
import authCtrl from "../controllers/auth_controllers.js";
import formidable from 'express-formidable'


const router = express.Router();

router.route("/api/users").post(userCtrl.create).get(userCtrl.list);
router.route("/api/users/verify").post(userCtrl.verify);

router.route('/api/users/photo/:userId')
  .get(userCtrl.photo, userCtrl.defaultPhoto)
router.route('/api/users/defaultphoto')
  .get(userCtrl.defaultPhoto)

router
  .route("/api/users/:userId")
  .get(authCtrl.requireSignin,userCtrl.read)
  .put(authCtrl.requireSignin,authCtrl.hasAuthorization,userCtrl.update)
  .delete(authCtrl.requireSignin,authCtrl.hasAuthorization,userCtrl.remove);

router.param("userId", userCtrl.userById);
export default router;

