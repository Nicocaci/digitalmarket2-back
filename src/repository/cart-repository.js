import CartDAO from "../dao/cart-dao.js"

class CartRepository {
    async createCart() {
        try {
            const newCart = await CartDAO.createCart();
            return newCart;
        } catch (error) {
            throw new Error('Error interno del repository:' + error.message);
        }
    }
    async getCart() {
        try {
            const carts = await CartDAO.getCart();
            if(!carts) throw new Error("No se encontro ningun carrito");
            return carts;
        } catch (error) {
            throw new Error('Error interno del repository:' + error.message);
        }
    }
    async getCartById(cartId) {
        try {
            const cartsId = await CartDAO.getCartById(cartId);
            if(!cartsId) throw new Error ("No se encontro ningun carrito con ese ID");
            return cartsId;
        } catch (error) {
            throw new Error('Error interno del repository:' + error.message);
        }
    }
    async addProductToCart(cartId,productId,quantity) {
        try {
            return await CartDAO.addProductToCart(cartId,productId,quantity);
        } catch (error) {
            throw new Error('Error interno del repository:' + error.message);
        }
    }
    async removeProductFromCart(cartId, productId, quantity) {
        try {
            return await CartDAO.removeProductFromCart(cartId,productId,quantity);
        } catch (error) {
            throw new Error(`Error interno del repository: ${error.message}`);
        }
    }
    async updateProductQuantity(cartId,productId,quantity) {
        try {
            return await CartDAO.updateProductQuantity(cartId,productId,quantity);
        } catch (error) {
            throw new Error(`Error interno del repository: ${error.message}`);
        }
    }
    async updateCart(cartId,products) {
        try {
            return await CartDAO.updateCart(cartId,products)
        } catch (error) {
            throw new Error(`Error interno del repository: ${error.message}`);
        }
    }
    async deleteCart(cartId) {
        try {
            const cart = await CartDAO.deleteCart(cartId);
            if(!cart) throw new Error("No se encontro ningun carrito");
            return cart;
        } catch (error) {
            throw new Error(`Error interno del repository: ${error.message}`);
        }
    }
}

export default new CartRepository();