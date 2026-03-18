import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

import productRouter from "./routes/products-router.js";
import cartRouter from "./routes/cart.router.js";
import userRouter from "./routes/user-router.js";
import orderRouter from "./routes/order-router.js";
import mercadoPagoRouter from "./routes/mercadoPago.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const allowedOrigins = ["http://localhost:5173", "https://www.digitalshopok.com", "https://digitalshopok.com"]



// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("✅ Conectado a MongoDB"))
    .catch((err) => console.error("❌ Error al conectar con MongoDB:", err));


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      // Permitir requests sin origin (por ejemplo, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS no permitido por este dominio"));
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  }),
);
app.use('/uploads', express.static('uploads'));
app.use(express.static("./src/public"));
app.use(cookieParser());


app.get("/", (req,res)=> {
    res.send("Estamos On")
})
app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);
app.use("/api/usuario", userRouter);
app.use("/api/orders", orderRouter);
app.use('/api/mercado-pago', mercadoPagoRouter);


// Servidor escuchando
// Iniciar servidor
// Iniciar servidor

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});

