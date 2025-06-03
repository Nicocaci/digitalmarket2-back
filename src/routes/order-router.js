import express from "express";
import OrderController from '../controllers/order.controller.js'

const router = express.Router();

router.post('/crear-orden', OrderController.crearOrden);
router.get('/usuario/:userId', OrderController.obtenerOrdenesPorUsuarios);
router.get('/todas', OrderController.obtenerTodasLasOrdenes);

export default router;