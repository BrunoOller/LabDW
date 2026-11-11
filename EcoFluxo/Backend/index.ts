import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";

// Importar as rotas
import routerUsuario from "./Routes/UsuarioRoutes.js";
import routerEcoponto from "./Routes/EcopontoRoutes.js";
import routerLixeira from "./Routes/LixeiraRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Incluir rotas
app.use("/ecofluxo", routerUsuario);
app.use("/ecoponto", routerEcoponto);
app.use("/lixeira", routerLixeira);

// Configuração do Swagger (Lê o arquivo gerado pelo swagger-autogen)
try {
    const swaggerFile = JSON.parse(
        fs.readFileSync(path.resolve("./swagger_output.json"), "utf-8")
    );
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
} catch (error) {
    console.warn("Arquivo swagger_output.json não encontrado. Execute o comando de geração do Swagger.");
}

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Swagger disponível em http://localhost:${PORT}/docs`);
});