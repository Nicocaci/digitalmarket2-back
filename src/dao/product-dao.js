import ProductModel from './models/product-model.js'

class ProductDAO {
        async createProduct(productData){
        try {
            const newProduct = await ProductModel.create(productData);
            return newProduct;
        } catch (error) {
            throw new Error('Error al crear producto:' + error.message);
        
        }
    }

    async getProduct(){
        try {
            const products = await ProductModel.find();
            if(!products) throw new Error("No hay Productos creados");
            return products;
        } catch (error) {
            throw new Error('Error al obtener el listado de productos:' + error.message);
        }
    }

    async getProductById(productId){
        try {
            const productsId = await ProductModel.findById(productId);
            if(!productsId) throw new Error("No existe producto con ese Id");
            return productsId;
        } catch (error) {
            throw new Error('Error al obtener el producto:' + error.message);
        }
    }

    async getProductByCategory(categoria){
        try {
            const productsId = await ProductModel.find({categoria});
            if(!productsId) throw new Error("No existe producto con esa Category");
            return productsId;
        } catch (error) {
            throw new Error('Error al obtener el producto:' + error.message);
        }
    }

    async updateProduct(productId,productData){
        try {
            const productUpdate = await ProductModel.findByIdAndUpdate(productId,productData, {new:true});
            if(!productUpdate) throw new Error('Producto no encontrado');
            return productUpdate;
        } catch (error) {
            throw new Error ('Error al actualizar producto:' + error.message);
        }
    }

    async deleteProduct(productId){
        try {
            const product = await ProductModel.findByIdAndDelete(productId);
            if(!product) throw new Error("Producto no encontrado");
            return product;
        } catch (error) {
            throw new Error('Error al eliminar el producto:' + error.message)
        }
    }
}

export default new ProductDAO();