import UserService from "../service/user.service.js";
import bcrypt from 'bcrypt';
import UserModel from "../dao/models/user-model.js";
import CartService from "../service/cart.service.js";
import generatetoken from "../utils/jsonwebtoken.js";


class UserController {
    async register(req, res) {
        const { nombre, apellido, dni, direccion, email, contraseña, cart, role } = req.body;
        try {
            const existeUser = await UserModel.findOne({ email });
            if (existeUser) {
                return res.status(400).json({ message: 'El email ya está registrado.' })
            }

            const hashPassword = bcrypt.hashSync(contraseña, 10);

            const nuevoCarrito = await CartService.createCart();

            const newUser = await UserService.createUser({
                nombre,
                apellido,
                dni,
                direccion,
                email,
                contraseña: hashPassword,
                cart: nuevoCarrito._id,
                role
            });

            return res.status(201).json({
                message: 'Usuario registrado con éxito',
                usuario: newUser,
            });

        } catch (error) {
            res.status(500).json({ message: 'Error interno del controller' + error })
        }
    }

    async login(req, res) {
        const { email, contraseña } = req.body;
        try {
            const usuario = await UserModel.findOne({ email });
            if (!usuario) {
                return res.status(400).json({ message: "Email no registrado" })
            };
            const esValid = await bcrypt.compare(contraseña, usuario.contraseña);
            if (!esValid) {
                return res.status(401).json({ message: "Contraseña incorrecta" })
            }

            const token = generatetoken({
                _id: usuario._id,
                cart: usuario.cart,
                email: usuario.email,
                direccion: usuario.direccion,
                role: usuario.role
            });
            console.log("TOKEN GENERADO:", token);

            res.cookie('access_token', token, {
                httpOnly: false,
                secure: true,         // ⬅️ false en localhost
                sameSite: 'lax',       // ⬅️ Lax funciona bien en la mayoría de los casos sin requerir HTTPS
                maxAge: 24 * 60 * 60 * 1000,
                path: '/',
                domain: ".railway.app",
            });

            return res.status(201).json({
                message: "Login con éxito",
                token
            });
        } catch (error) {
            res.status(500).json({ message: 'Error de Login: ' + error.message });
        }
    }

    async logOut(req, res) {
        res.clearCookie('access_token', {
            httpOnly: false,
            secure: true,
            sameSite: 'lax',
            domain: ".railway.app",
            path: "/"
        });
        res.status(200).json({ message: "Logout exitoso" });
    }

    async deleteUser(req, res) {
        const uId = req.params.uId;
        try {
            const user = await UserService.deleteUser(uId);
            if (!user) {
                return res.status(404).json({ message: "No se encontro usuario" })
            }
            return res.status(204).json({ message: "Usuario eliminado con exito" });

        } catch (error) {
            res.status(500).json({ message: 'Error para eliminar usuario ' + error.message });
        }
    }

    async updateUser(req, res) {
        const userId = req.params.id;
        const userData = req.body;
        try {
            const usuarioActualizado = await UserService.updateUser(userData, userId);
            if (!usuarioActualizado) {
                res.status(404).json({ message: "Usuario no encontrado" })
            };
            res.status(200).json(usuarioActualizado);
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar usuario: ' + error.message });
        }
    }

}

export default new UserController();