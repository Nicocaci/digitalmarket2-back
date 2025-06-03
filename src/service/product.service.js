import ProductRepository from "../repository/product-repository.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "../../uploads");

function eliminarArchivoSiExiste(nombreArchivo) {
  const rutaCompleta = path.join(uploadsDir, nombreArchivo);
  if (fs.existsSync(rutaCompleta)) {
    fs.unlinkSync(rutaCompleta);
  }
}

class ProductService {
    async createProduct(productData) {
        try {
            const product = await ProductRepository.createProduct(productData);
            return product;
        } catch (error) {
            throw new Error('Error al crear producto (service):' + error.message);
        }
    }

    async getProduct() {
        try {
            const products = await ProductRepository.getProduct();
            if (!products) throw new Error("No se encontro nigun producto");
            return products;
        } catch (error) {
            throw new Error('Error al obtener producto (service):' + error.message);
        }
    }
    async getProductById(productId) {
        try {
            const productsId = await ProductRepository.getProductById(productId);
            if (!productsId) throw new Error("No se encontro ningun producto con ese ID");
            return productsId;
        } catch (error) {
            throw new Error('Error al obtener producto (service):' + error.message);
        }
    }

        async getProductByCategory(productCategory) {
        try {
            const productsCategory = await ProductRepository.getProductByCategory(productCategory);
            if (!productsCategory) throw new Error("No se encontro ningun producto con esa Category");
            return productsCategory;
        } catch (error) {
            throw new Error('Error al obtener producto (service):' + error.message);
        }
    }

    async updateProduct(productId, productData) {
        try {
            const productUpdate = await ProductRepository.updateProduct(productId,productData);
            if(!productUpdate) throw new Error(" No se encontro ningun producto para actualizar");
            return productUpdate;
        } catch (error) {
            throw new Error('Error al actualizar el producto (service):' + error.message);
        }
    }
    async deleteProduct(productId) {
        try {
            const product = await ProductRepository.deleteProduct(productId);
            if(!product) throw new Error("No se encontro ningun producto");
            
            if (product.imagen?.length > 0) {
                product.imagen.forEach(eliminarArchivoSiExiste);
            }

            return product;
        } catch (error) {
            throw new Error('Error al eliminar producto (service):' + error.message);
        }
    }

}

export default new ProductService();