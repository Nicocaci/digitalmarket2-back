import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    imagen: {
        type: [String],
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    peso: {
        type: Number,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    }
});

const ProductModel = mongoose.model("products", productSchema);

export default ProductModel;