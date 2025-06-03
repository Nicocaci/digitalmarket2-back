import CartModel from "./models/cart-model.js";
import ProductModel from "./models/product-model.js";

class CartDAO {
    async createCart() {
        try {
            const newCart = new CartModel();
            return await newCart.save();
        } catch (error) {
            throw new Error('Error interno del DAO:' + error.message);
        }
    }
    async getCart() {
        try {
            const carts = await CartModel.find();
            if (!carts) throw new Error("No se encontro ningun carrito");
            return carts;
        } catch (error) {
            throw new Error('Error interno del DAO:' + error.message);
        }
    }
    async getCartById(cartId) {
        try {
            const cartsId = await CartModel.findById(cartId).populate("products.product");
            if (!cartsId) throw new Error("No se encontro nigun carrito con ese ID");
            return cartsId;
        } catch (error) {
            throw new Error('Error interno del DAO:' + error.message);
        }
    }

    async addProductToCart(cartId, productId, quantity) {
        try {
            // Buscamos carrito (sin populate)
            const cart = await CartModel.findById(cartId);
            if (!cart) throw new Error("No se encontró ningún carrito");

            // Buscamos producto para validar existencia
            const product = await ProductModel.findById(productId);
            if (!product) throw new Error("No se encontró ningún producto");

            // Verificamos si el producto ya está en el carrito
            // NOTA: p.product es ObjectId, no objeto, así que lo comparamos directo con productId
            const productIndex = cart.products.findIndex(p =>
                p.product.toString() === productId
            );

            if (productIndex !== -1) {
                // Sumar la cantidad al producto existente
                cart.products[productIndex].quantity += quantity;
            } else {
                // Agregar producto nuevo al carrito
                cart.products.push({ product: productId, quantity });
            }

            // Guardar carrito actualizado
            await cart.save();

            // Traer carrito actualizado con populate para devolverlo
            const updatedCart = await CartModel.findById(cartId).populate("products.product");

            return updatedCart;

        } catch (error) {
            throw new Error('Error interno del DAO:' + error.message);
        }
    }


    async removeProductFromCart(cartId, productId, quantity) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) throw new Error("No se encontro ningún carrito");

            const product = await ProductModel.findById(productId);
            if (!product) throw new Error(" No se encontro ningún producto")

            //Verificamos si el producto ya esta en el carrito
            const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);

            // !== -1 significa que el producto no se encuentra
            if (productIndex === -1) throw new Error("El producto no se encuentra en el carrito.");

            if (cart.products[productIndex].quantity <= quantity) {
                cart.products.splice(productIndex, 1);
            } else {
                cart.products[productIndex].quantity -= quantity;
            }

            await cart.save();
            return cart;
        } catch (error) {
            throw new Error('Error interno del DAO:' + error.message);
        }
    }

    async updateProductQuantity(cartId, productId, quantity) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) throw new Error("No se encontro ningún carrito");

            const product = await ProductModel.findById(productId);
            if (!product) throw new Error(" No se encontro ningún producto")

            const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);

            if (productIndex === -1) throw new Error("El carrito se encuentra vacío");

            cart.products[productIndex].quantity = quantity;

            await cart.save();
            return cart;
        } catch (error) {
            throw new Error('Error interno del DAO:' + error.message);
        }
    }

    async updateCart(cartId, products) {
        try {
            const updateCart = await CartModel.findByIdAndUpdate(cartId, { products }, { new: true });
            return updateCart;
        } catch (error) {
            throw new Error('Error interno del DAO:' + error.message);
        }
    }
    async deleteCart(cartId) {
        try {
            const cart = await CartModel.findByIdAndDelete(cartId);
            if (!cart) throw new Error("No se encontro nigun carrito para eliminar");
            return cart;
        } catch (error) {
            throw new Error('Error interno del DAO:' + error.message);
        }
    }
}

export default new CartDAO();