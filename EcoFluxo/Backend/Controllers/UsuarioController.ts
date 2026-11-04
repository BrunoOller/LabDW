import prisma from "../lib/prisma.js";
import type {Request, Response} from "express";
export default class UsuarioController{
    static async Create(req:Request,res:Response){
        try
         {
            const {} = req.body;
            //verificação dos dados obrigatórios

            //inserir no banco de dados
        } catch (error) {
            
        }
        
    };
    static async Login(req:Request,res:Response){
        try
         {
            const {} = req.body;
            //verificação dos dados obrigatórios

            
        } catch (error) {
            
        }
        
    };
    static async Logout(req:Request,res:Response){
        try
         {
            
        } catch (error) {
            
        }
        
    };
    static async Verify2FA(req:Request,res:Response){
        try
         {
            const {} = req.body;
            //verificação dos dados obrigatórios

            //inserir no banco de dados
        } catch (error) {
            
        }
        
    };
    static async Reset(req:Request,res:Response){
        try
         {
            const {} = req.body;
            //verificação dos dados obrigatórios

            //inserir no banco de dados
        } catch (error) {
            
        }
        
    };
    static async forgotPassword(req:Request,res:Response){
        try
         {
            const {} = req.body;
            //verificação dos dados obrigatórios

            //inserir no banco de dados
        } catch (error) {
            
        }
        
    };
}