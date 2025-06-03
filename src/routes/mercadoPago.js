import express from 'express';
import mercadopago from '../config/mercadoPago.js';
import { Preference } from 'mercadopago'; // 👈 importante

const router = express.Router();

router.post('/crear-preferencia', async (req, res) => {
  try {
    const { carrito, ordenId } = req.body;

    const items = carrito.map(item => ({
      title: item.nombre,
      quantity: item.cantidad,
      unit_price: Number(item.precio),
      currency_id: 'ARS',
    }));

    const preference = new Preference(mercadopago);

    const result = await preference.create({
      body: {
        items,
        external_reference: ordenId,
        back_urls: {
          success: 'https://tusitio.com/pago-exitoso',
          failure: 'https://tusitio.com/pago-fallido',
          pending: 'https://tusitio.com/pago-pendiente',
        },
        auto_return: 'approved',
      }
    });

    res.json({ id: result.id });
  } catch (error) {
    console.error('Error al crear preferencia:', error); // 👈 Copiame lo que sale acá
    res.status(500).json({ error: 'No se pudo crear la preferencia' });
  }
});

export default router;
