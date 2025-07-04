import OrderService from "../service/order.service.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();




class OrderController {
async crearOrden(req, res) {
    try {
        const token = req.cookies?.access_token;
        if (!token) {
            return res.status(401).json({ mensaje: 'Token no encontrado en cookies' });
        }

        // Decodificás el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Le agregás el userId decodificado a la orden
        const datos = {
            ...req.body,
            userId: decoded._id,
        };

        const orden = await OrderService.crearOrden(datos);
        res.status(201).json({ message: 'Orden creada con éxito', orden });
    } catch (error) {
        console.error('Error al crear orden:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
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

    async obtenerTodasLasOrdenes(req,res) {
        try {
            const ordenes = await OrderService.obtenerTodasLasOrdenes();
            res.status(200).json(ordenes)
        } catch (error) {
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    }
}


export default new OrderController();