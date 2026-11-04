import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParse from "cookie-parser";
import swaggerUi from "swagger-ui-express";
//importar as rotas
import routerEcoponto from "./Routes/EcopontoRoutes.js";
import routerLixeira from "./Routes/LixeiraRoutes.js";
import swaggerDocument from "./swagger.js";
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true,
}));
app.use(express.json());
app.use(cookieParse());
//incluir rotas
app.use("/ecoponto", routerEcoponto);
app.use("/lixeira", routerLixeira);
//documentação swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Swagger em http://localhost:${PORT}/api-docs`);
});
