import ProductModel from '../dao/models/product-model.js';
import ProductService from '../service/product.service.js';

class ProductController {
    async createProduct(req, res) {
        const {nombre, categoria, imagen, precio, stock } = req.body;
        const imagenes = req.files?.imagen?.map(file => file.filename) || [];
        try {
            const nuevoProducto = await ProductModel.create({
                nombre,
                categoria,
                imagen: imagenes,
                precio,
                stock
            })
            res.status(201).json({ message: "Producto creado correctamente", nuevoProducto });
        } catch (error) {
            console.error("Error al crear el producto:", error);
            res.status(500).json({ error: error.message })
        }
    }

    async getProduct(req, res) {
        try {
            const products = await ProductService.getProduct();
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json({ error: "Error interno del controlador de productos" });
        }
    }

    async getProductById(req, res) {
        const productsId = req.params.id;
        try {
            const products = await ProductService.getProductById(productsId);
            if (!products) {
                return res.status(404).json({ message: "No se encontro ningun producto con ese ID" });
            }
            res.status(200).json(products);
        } catch (error) {
            console.log("Error al obtener ese producto:", error);

            res.status(500).json({ error: "Error interno del controlador de productos" });
        }
    }
    async getProductByCategory(req, res) {
        const productsCategory = req.params.id;
        try {
            const products = await ProductService.getProductByCategory(productsCategory);

            // Asegurarse de que siempre sea un array
            const productArray = Array.isArray(products) ? products : [products];

            if (!productArray.length) {
                return res.status(404).json({ message: "No se encontró ningún producto con esa categoría" });
            }

            res.status(200).json(productArray);
        } catch (error) {
            console.log("Error al obtener productos por categoría:", error);
            res.status(500).json({ error: "Error interno del controlador de productos" });
        }
    }

    async updateProduct(req, res) {
        const productId = req.params.id;
        const productData = req.body;
        try {
            const productUpdate = await ProductService.updateProduct(productId, productData);
            res.json({ message: "Producto actualizado correctamente" });
        } catch (error) {
            res.status(500).json({ error: "Error interno del controlador de productos" });
        }
    }

    async deleteProduct(req, res) {
        const productId = req.params.id;
        try {
            const product = await ProductService.deleteProduct(productId);
            if (!product) {
                return res.status(404).json({ message: "Producto no encontrado para eliminar" })
            }
            res.status(200).json({ message: "Producto eliminado correctamente" })
        } catch (error) {
            res.status(500).json({ error: "Error interno del controlador de productos" }); s
        }
    }
}

export default new ProductController();