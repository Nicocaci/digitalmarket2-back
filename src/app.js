import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

import productRouter from "./routes/products-router.js";
import cartRouter from "./routes/cart.router.js";
import userRouter from "./routes/user-router.js";

dotenv.config();

const app = express();


// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("✅ Conectado a MongoDB"))
    .catch((err) => console.error("❌ Error al conectar con MongoDB:", err));


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.static("./src/public"));
app.use(cookieParser());
app.use(cors({
    origin: //"http://localhost:5173"
                "https://digitalmarket-front-virid.vercel.app",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"]
}));

app.get("/", (req,res)=> {
    res.send("Estamos On")
})
app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);
app.use("/api/usuario", userRouter);


// Servidor escuchando
// Iniciar servidor
// Iniciar servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});