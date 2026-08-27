import "dotenv/config"; // PRECISA ser a primeira importação no index.js
import express from "express";
import cors from "cors";
// Incluir as rotas 
import routesTarefa from "./Routes/routesTarefa.js";
import routesUsuario from "./Routes/routesUsuario.js";
// Importando Swagger
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";

import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
// Suporte para importar arquivos .json usando ESModules
const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger-output.json");

const app = new express();

// Comunicação entre front e back utilizar .json
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    credential: true,
    origin: FRONTEND_URL
}));
// Obrigatóriamente o swagger deve vir antes das rotas
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ligar o express com as rotas
app.use("/ToDo", routesTarefa);
app.use("/ToDo", routesUsuario);
app.listen(PORT);