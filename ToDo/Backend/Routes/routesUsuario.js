import { Router } from "express";
import UsuarioController from "../Controllers/UsuarioController.js";

const routesUsuario = new Router();

// Criando rotas referentes aos métodos no UsuarioController
routesUsuario.post("/createUsuario", UsuarioController.Create);
routesUsuario.post("/Login", UsuarioController.Login);

// Exportando rotas
export default routesUsuario;