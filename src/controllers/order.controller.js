import OrderService from "../service/order.service.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();




class OrderController {
    async crearOrden(req, res) {
        try {
            let userId = null;
            const token = req.cookies?.access_token;

            if (token) {
                try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                    userId = decoded._id;
                    console.log("✅ Token válido. Usuario:", userId);
                } catch (err) {
                    console.warn("⚠️ Token inválido o expirado:", err.message);
                    // NO devolvemos 401, seguimos sin userId
                }
            } else {
                console.log("⚠️ No se recibió token. Orden sin usuario logueado.");
            }

            const datos = {
                ...req.body,
                userId, // puede ser null
            };

            console.log("📦 Creando orden con datos:", datos);

            const orden = await OrderService.crearOrden(datos);
            res.status(201).json({ message: 'Orden creada con éxito', orden });
        } catch (error) {
            console.error('❌ Error al crear orden:', error.message, error);
            res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
        }
    }


    async obtenerOrdenesPorUsuarios(req, res) {
        try {
            const userId = req.params.userId;
            const ordenes = await OrderService.obtenerOrdenesPorUsuarios(userId);
            res.status(200).json({ ordenes });
        } catch (error) {
            console.error('Error al obtener órdenes:', error);
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    }

    async obtenerTodasLasOrdenes(req, res) {
        try {
            const ordenes = await OrderService.obtenerTodasLasOrdenes();
            res.status(200).json(ordenes)
        } catch (error) {
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    }
}


export default new OrderController();