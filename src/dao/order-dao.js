import OrderModel from "./models/order-model.js";

class OrderDAO {
    async crearOrden (ordenData) {
        const nuevaOrden = new OrderModel(ordenData);
        return await nuevaOrden.save();
    }

    async obtenerOrdenesPorUsuario(userId) {
        return await OrderModel.find({userId}).sort({fecha: -1});
    }
}

export default new OrderDAO();