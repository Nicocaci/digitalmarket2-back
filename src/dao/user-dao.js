import UserModel from "./models/user-model.js";


class UserDAO{
    async findById(userId){
        try {
            const uId = await UserModel.findById(userId);
            if(!uId) throw new Error("No se encontro ningún usuario con ese ID");
            return uId;
        } catch (error) {
            throw new Error(`Error interno del DAO ${error.message}`);
        }
    }

    async findOne(query){
        try {
            const user = await UserModel.findOne(query);
            if(!user) throw new Error("No se encontro ningún usuario");
            return user;
        } catch (error) {
            throw new Error(`Error interno del DAO ${error.message}`);
        }
    }

    async save(userData){
        try {
            const newUser = new UserModel(userData);
            await newUser.save();
            return newUser;
        } catch (error) {
            throw new Error(`Error interno del DAO ${error.message}`);
        }
    }

    async updateUser(userId, userData){
        try {
            const userUpdate = await UserModel.findByIdAndUpdate(userId, userData, {new:true});
            if(!userUpdate) throw new Error("No se encontro ningun usuario para actualizar.");
            return userUpdate;
        } catch (error) {
            throw new Error(`Error interno del DAO ${error.message}`);
        }
    }

    async deleteUser(userId){
        try {
            const userDelete = await UserModel.findByIdAndDelete(userId);
            if(!userDelete) throw new Error("No se encontro ningun usuario para eliminar.");
            return userDelete;
        } catch (error) {
            throw new Error(`Error interno del DAO ${error.message}`);
        }
    }
}

export default new UserDAO();