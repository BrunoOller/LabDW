import type{Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
export interface UsuarioPayload{
    id:number;
    nome: string;
    email: string;
    perfil: "MORADOR"|"GESTOR";
}
export interface AuthRequest extends Request{
    user?:UsuarioPayload;
}
//autenticação
export const autenticacaoToken = (req:AuthRequest, res:Response, next:NextFunction)=>{
    const token = req.cookies.jwt;
    if(!token){
        return res.status(402).json({message:"Acesso Negado"});
    }
    try
    {
        const decode = jwt.verify(token, JWT_SECRET ) as UsuarioPayload;
        req.user = decode;
        next();

    }
    catch(error)
    {
        //limpar dados do cookies
        res.clearCookie("jwt");
        return res.status(403).json({message:"Acesso Negado", error});
    }
};
//verificar perfil do usuário
export const autorizacaoPerfil = (perfilPermitido:"MORADOR"|"GESTOR")=>{
    return (req: AuthRequest, res:Response, next:NextFunction)=>{
        //verificar se os dados usuário estão ok
        if(!req.user){
            return res.status(402).json({message:"Não está autenticado"});
        }
        if(req.user.perfil !== perfilPermitido){
            return res.status(402).json({message:"Acesso Negado"});

        }
        next();
    };
};