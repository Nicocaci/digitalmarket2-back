import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    nombre: String,
    email: String,
    direccion: String,
    productos: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
            nombre: String,
            precio: Number,
            quantity: Number
        }
    ],
    total: Number,
    fecha: { type: Date, default: Date.now },
    estado: { type: String, default: 'pendiente' }
});

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;