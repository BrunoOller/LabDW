import { Router } from 'express';
import { autenticacaoToken, autorizacaoPerfil } from "../Middlewares/seguranca.js";
import UsuarioController from '../Controllers/UsuarioController.js';

const routerUsuario = Router();
routerUsuario.post("/create",  UsuarioController.Create);
routerUsuario.post("/login",  UsuarioController.Login);

export default routerUsuario;