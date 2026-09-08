import {Router} from "express";
import TarefaController from "../Controllers/TarefaController.js";
import UserMiddleware from "../Middleware/UserMiddleware.js"

const routesTarefa = new Router();

routesTarefa.post("/createTarefa", UserMiddleware, TarefaController.Create);
routesTarefa.get("/getAllTarefa", UserMiddleware, TarefaController.getAll);

export default routesTarefa;