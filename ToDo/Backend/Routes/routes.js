import { Router } from "express";
import TarefaController from "../Controllers/TarefaController.js";

const routes = new Router();

// Criando rotas referentes aos métodos no TarefaController
routes.post("/create", TarefaController.Create());
routes.get("/getAll", TarefaController.getAll());

// Exportando rotas
export default routes;