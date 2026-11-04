import { Router } from 'express';
import { autenticacaoToken, autorizacaoPerfil } from "../Middlewares/seguranca.js";
import LixeiraController from '../Controllers/LixeiraController.js';

const routerLixeira = Router();
routerLixeira.post("/createLixeira", /*autenticacaoToken, 
    autorizacaoPerfil("GESTOR"),*/ LixeiraController.Create);
routerLixeira.get("/getLixeiras", /*autenticacaoToken,*/ LixeiraController.getLixeiras);

export default routerLixeira;