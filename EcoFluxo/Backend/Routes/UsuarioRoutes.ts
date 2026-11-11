import { Router } from 'express';
import { autenticacaoToken, autorizacaoPerfil } from "../Middlewares/seguranca.js";
import UsuarioController from '../Controllers/UsuarioController.js';

const routerUsuario = Router();
routerUsuario.post("/login",  UsuarioController.Login);
routerUsuario.post('/verify-2fa', UsuarioController.Verify2FA);
routerUsuario.post("/logout",  UsuarioController.Logout);
export default routerUsuario;