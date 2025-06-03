import express from "express";
import ProductController from "../controllers/product.controller.js";
import upload from "../config/multerConfig.js";

const router = express.Router();


router.post('/', upload.fields([
    {name: 'imagen', maxCount:10}
]), ProductController.createProduct)



router.get("/", ProductController.getProduct);

router.get("/:id", ProductController.getProductById);

router.get("/categoria/:id", ProductController.getProductByCategory);

router.put("/:id", ProductController.updateProduct);

router.delete("/:id", ProductController.deleteProduct);

export default router;