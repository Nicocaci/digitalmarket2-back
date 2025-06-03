import mongoose from "mongoose";
mongoose.connect("mongodb+srv://nicocaci:nicocaci@coderhouse.ihpiu.mongodb.net/digitalMarket?retryWrites=true&w=majority&appName=coderhouse")
                .then(()=> console.log("✅ Conectado a la base de datos correctamente"))
                .catch(()=> console.log("❌ Error al conectar la base de datos"))