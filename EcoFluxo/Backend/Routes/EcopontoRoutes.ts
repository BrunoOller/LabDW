import { Router } from 'express';
import { autenticacaoToken, autorizacaoPerfil } from "../Middlewares/seguranca.js";
import EcopontoController from '../Controllers/EcopontoController.js';

const routerEcoponto = Router();
routerEcoponto.post("/createEcoponto", /*autenticacaoToken, 
    autorizacaoPerfil("GESTOR"),*/ EcopontoController.Create);
routerEcoponto.get("/getEcopontos", /*autenticacaoToken,*/ EcopontoController.getEcopontos);


export default routerEcoponto;