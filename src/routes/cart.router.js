import express from "express";
import CartController from "../controllers/cart.controller.js";
import { authMiddleware } from "../utils/authMiddleware.js";


const router = express.Router();

router.post("/", CartController.createCart);

router.get("/", CartController.getCart);

router.get("/:id", CartController.getProductsCart);

router.get("/mi-carrito", authMiddleware, CartController.getCartByToken);

router.post("/:cid/productos/:pid", CartController.addProductToCart);

router.delete("/:cid/productos/:pid", CartController.removeProductFromCart);

router.put("/:cid/productos/:pid", CartController.updateProductQuantity);

router.put("/:cid", CartController.updateCart);

router.delete("/:cid", CartController.deleteCart);

router.delete('/:cid/productos', CartController.clearCart);



export default router;