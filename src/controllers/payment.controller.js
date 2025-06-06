import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from "dotenv";
dotenv.config();

// Creamos el client con tu access token
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

export const createOrder = async (req, res) => {
    try {
        const preference = new Preference(client);

        const productos = req.body.productos;

        if (!productos || !Array.isArray(productos) || productos.length === 0) {
            return res.status(400).json({ error: 'No hay productos en la orden' });
        }

        const items = productos.map(producto => ({
            title: producto.nombre,
            unit_price: Number(producto.precio),
            currency_id: "ARS",
            quantity: producto.quantity,
        }));

        const result = await preference.create({
            body: {
                items,
                payer: {
                    name: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,

                },
                back_urls: {
                    success: "https://digitalmarket-back-production.up.railway.app/gracias",
                    failure: "https://www.google.com",
                    pending: "https://www.google.com"
                },
                auto_return: "approved"
            },
        });

        console.log("Preferencia creada:", result);
        res.json({ init_point: result.init_point }); // devolvés solo lo que necesitás
    } catch (error) {
        console.error("Error al crear la preferencia de Mercado Pago:", error);
        res.status(500).json({ error: "Error al crear la orden" });
    }
};

