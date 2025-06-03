import ProductDao from "../dao/product-dao.js";

class ProductRepository {
    async createProduct(productData) {
        try {
            const newProduct = await ProductDao.createProduct(productData);
            return newProduct;
        } catch (error) {
            throw new Error('Error al crear producto nuevo(repository):' + error.message);
        }
    }

    async getProduct() {
        try {
            const products = await ProductDao.getProduct();
            if(!products) throw new Error("No se encontro nigun producto creado.");
            return products;
        } catch (error) {
            throw new Error('Error al obtener productos (repository):' + error.message);
        }
    }

    async getProductById(productId) {
        try {
            const productsId = await ProductDao.getProductById(productId);
            if(!productsId) throw new Error ("No se encontro ningun producto con ese ID");
            return productsId;
        } catch (error) {
            throw new Error ('Error al obtener ese producto (repository):' + error.message);

        }
    }

        async getProductByCategory(productCategory) {
        try {
            const productsCategory = await ProductDao.getProductByCategory(productCategory);
            if(!productsCategory) throw new Error ("No se encontro ningun producto con esa Category");
            return productsCategory;
        } catch (error) {
            throw new Error ('Error al obtener ese producto (repository):' + error.message);

        }
    }

    async updateProduct(productId, productData) {
        try {
            const productUpdate = await ProductDao.updateProduct(productId, productData);
            if(!productData) throw new Error ("Producto no encontrado");
            return productUpdate;
        } catch (error) {
            throw new Error('Error al actualizar producto(repository): ' + error.message);
        }
    }

    async deleteProduct(productId) {
        try {
            const product = await ProductDao.deleteProduct(productId);
            if(!product) throw new Error("Producto no encontrado");
            return product;
        } catch (error) {
            throw new Error('Error al eliminar producto (repository):' + error.message);
        }
    }
}

export default new ProductRepository();