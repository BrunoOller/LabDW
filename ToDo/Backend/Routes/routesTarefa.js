import { Router } from "express";
import TarefaController from "../Controllers/TarefaController.js";

const routesTarefa = new Router();

// Criando rotas referentes aos métodos no TarefaController
routesTarefa.post("/create", TarefaController.Create);
routesTarefa.get("/getAll", TarefaController.getAll);

// Exportando rotas
export default routesTarefa;