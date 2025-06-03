import UserRepository from "../repository/user-repository.js";

class UserService{
        async userById(userId) {
            try {
                return await UserRepository.findById(userId);
            } catch (error) {
                throw new Error(`Error interno del Service ${error.message}`);
            }
        }
    
        async findUser(query) {
            try {
                const user = await UserRepository.findOne(query);
                return user;
            } catch (error) {
                throw new Error(`Error interno del Service ${error.message}`);
            }
        }
    
        async createUser(userData) {
            try {
                const newUser = await UserRepository.createUser(userData);
                return newUser;
            } catch (error) {
                throw new Error(`Error interno del Service ${error.message}`);
            }
        }
    
        async updateUser(userId, userData) {
            try {
                const userUpdate = await UserRepository.updateUser(userId, userData);
                if (!userUpdate) throw new Error("No se encontro ningun usuario para actualizar.");
                return userUpdate;
            } catch (error) {
                throw new Error(`Error interno del Service ${error.message}`);
            }
        }
    
        async deleteUser(userId) {
            try {
                return await UserRepository.deleteUser(userId);
            } catch (error) {
                throw new Error(`Error interno del Service ${error.message}`);
            }
        }
}

export default new UserService();