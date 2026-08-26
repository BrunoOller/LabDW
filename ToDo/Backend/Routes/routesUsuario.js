import { Router } from "express";
import UsuarioController from "../Controllers/UsuarioController.js";

const routesUsuario = new Router();

// Criando rotas referentes aos métodos no UsuarioController
routesUsuario.post("/createUsuario", UsuarioController.Create);

// Exportando rotas
export default routesUsuario;