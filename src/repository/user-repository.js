import UserDAO from "../dao/user-dao.js";

class UserRepository {
    async userById(userId) {
        try {
            return await UserDAO.findById(userId);
        } catch (error) {
            throw new Error(`Error interno del Repository ${error.message}`);
        }
    }

    async findUser(query) {
        try {
            const user = await UserDAO.findOne(query);
            return user;
        } catch (error) {
            throw new Error(`Error interno del Repository ${error.message}`);
        }
    }

    async createUser(userData) {
        try {
            const newUser = await UserDAO.save(userData);
            return newUser;
        } catch (error) {
            throw new Error(`Error interno del Repository ${error.message}`);
        }
    }

    async updateUser(userId, userData) {
        try {
            const userUpdate = await UserDAO.updateUser(userId, userData);
            if (!userUpdate) throw new Error("No se encontro ningun usuario para actualizar.");
            return userUpdate;
        } catch (error) {
            throw new Error(`Error interno del Repository ${error.message}`);
        }
    }

    async deleteUser(userId) {
        try {
            return await UserDAO.deleteUser(userId);
        } catch (error) {
            throw new Error(`Error interno del Repository ${error.message}`);
        }
    }
}

export default new UserRepository();