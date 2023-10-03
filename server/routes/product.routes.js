import express from "express";
import shopCtrl from "../controllers/shop_controllers.js";
import authCtrl from "../controllers/auth_controllers.js";
import productCtrl from "../controllers/product_controllers.js";
const router = express.Router();
router
  .route("/api/products/by/:shopId")
  .post(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.create)
  .get(productCtrl.listByShop);

router.route("/api/products/latest").get(productCtrl.listLatest);

router.route("/api/products/related/:productId").get(productCtrl.listRelated);

router.route("/api/products/categories").get(productCtrl.listCategories);
router.route("/api/products").get(productCtrl.list)

router.route("/api/products/:productId").get(productCtrl.read);

router
  .route("/api/product/photo/:productId")
  .get(productCtrl.photo, productCtrl.defaultPhoto);
router.route("/api/product/defaultphoto").get(productCtrl.defaultPhoto);


router.route('/api/product/:shopId/:productId')
  .put(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.update)
  .delete(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.remove)

router.param("shopId", shopCtrl.shopByID);
router.param("productId", productCtrl.productByID);
// router.param("slug",productCtrl.slug);
export default router;
