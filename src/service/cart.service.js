import CartRepository from "../repository/cart-repository.js";
import CartModel from "../dao/models/cart-model.js";

class CartService {
    async createCart() {
        try {
            const newCart = await CartRepository.createCart();
            return newCart;
        } catch (error) {
            throw new Error(`Error interno en el service: ${error.message}`);
        }
    }
    async getCart() {
        try {
            const carts = await CartRepository.getCart();
            if(!carts) throw new Error("No se encontro ningun carrito");
            return carts;
        } catch (error) {
            throw new Error(`Error interno en el service: ${error.message}`);
        }
    }
    async getCartById(cartId) {
        try {
            const cartsId = await CartRepository.getCartById(cartId);
            if(!cartsId) throw new Error ("No se encontro ningun carrito con ese ID");
            return cartsId;
        } catch (error) {
            throw new Error(`Error interno en el service: ${error.message}`);
        }
    }
    async addProductToCart(cartId,productId,quantity) {
        try {
            return await CartRepository.addProductToCart(cartId,productId,quantity);
        } catch (error) {
            throw new Error(`Error interno en el service: ${error.message}`);
        }
    }
    async removeProductFromCart(cartId, productId, quantity) {
        try {
            return await CartRepository.removeProductFromCart(cartId,productId,quantity);
        } catch (error) {
            throw new Error(`Error interno del service: ${error.message}`);
        }
    }
    async updateProductQuantity(cartId,productId,quantity) {
        try {
            return await CartRepository.updateProductQuantity(cartId,productId,quantity);
        } catch (error) {
            throw new Error(`Error interno del service: ${error.message}`);
        }
    }
    async updateCart(cartId,products) {
        try {
            return await CartRepository.updateCart(cartId,products)
        } catch (error) {
            throw new Error(`Error interno del service: ${error.message}`);
        }
    }

async clearCartProducts(cartId) {
    // Buscar el carrito y eliminar todos los productos
    const cart = await CartModel.findById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    cart.products = []; // vaciar array de productos

    await cart.save();

    return cart;
}


    async deleteCart(cartId) {
        try {
            const cart = await CartRepository.deleteCart(cartId);
            if(!cart) throw new Error("No se encontro ningun carrito");
            return cart;
        } catch (error) {
            throw new Error(`Error interno del service: ${error.message}`);
        }
    }
}

export default new CartService();