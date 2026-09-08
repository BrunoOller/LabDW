import "dotenv/config"; //tem que ser a primeira linha no index.js
import express from "express";
import cors from "cors";
import routesTarefa from "./Routes/routesTarefa.js";
import routesUsuario from "./Routes/routesUsuario.js";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
//suporte para importar arquivos json usando ESModules
const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger-output.json");
const app = new express();
//comunicação entre front e back usar json
app.use(express.json());

app.use(cors({
    credentials: true, 
    origin: FRONTEND_URL
}));
app.use(cookieParser());
//obrigatoriamente o swagger deve vir antes das rotas
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/ToDo", routesTarefa);
app.use("/ToDo", routesUsuario);
app.listen(PORT);