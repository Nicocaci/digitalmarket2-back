import OrderService from "../service/order.service.js";




class OrderController {
    async crearOrden(req, res) {
        try {
            const datos = req.body;
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