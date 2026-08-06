import express from "express";
import cors from "cors";
// Incluir as rotas 
const app = new express();

// Comunicação entre front e back utilizar .json
app.use(express.json());
app.use(cors({
    credential: true,
    origin: "http://localhost:3000"
}));
// Ligar o express com as rotas
app.listen(5000);