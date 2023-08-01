import express from "express";
import authCtrl from "../controllers/auth_controllers.js";
import productCtrl from "../controllers/product_controllers.js";
import userCtrl from "../controllers/user_controllers.js";
import orderCtrl from "../controllers/order_controllers.js";
import shopCtrl from "../controllers/shop_controllers.js";
const router = express.Router();

router
  .route("/api/orders/:userId")
  .post(authCtrl.requireSignin, productCtrl.decreaseQuantity, orderCtrl.create);

router
  .route("/api/orders/user/:userId")
  .get(authCtrl.requireSignin, orderCtrl.listByUser);

router
  .route("/api/orders/shop/:shopId")
  .get(authCtrl.requireSignin, shopCtrl.isOwner, orderCtrl.listByShop);

  router.route("/api/order/status_values").get(orderCtrl.getStatusValues);
router.route("/api/order/:orderId").get(authCtrl.requireSignin, orderCtrl.read);


router
  .route("/api/order/:shopId/cancel/:productId")
  .put(
    authCtrl.requireSignin,
    shopCtrl.isOwner,
    productCtrl.increaseQuantity,
    orderCtrl.update
  );

router
  .route("/api/order/:orderId/charge/:userId/:shopId")
  .put(authCtrl.requireSignin, shopCtrl.isOwner, orderCtrl.update);

router
  .route("/api/order/status/:shopId")
  .put(authCtrl.requireSignin, shopCtrl.isOwner, orderCtrl.update);


router.param("userId", userCtrl.userById);
router.param("shopId", shopCtrl.shopByID);
router.param("productId", productCtrl.productByID);
router.param("orderId", orderCtrl.orderByID);
export default router;
