import prisma from "../lib/prisma.js";
import type {Request, Response} from "express";
export default class EcopontoController{
    static async Create(req:Request,res:Response){
        try
         {
            const {nome, latitude, longitude, descricao, cep, logradouro, numero, bairro, cidade, uf, nota} = req.body;
            //verificação dos dados obrigatórios
            if(!nome || typeof nome !== "string" || nome.trim() === ""){
                return res.status(400).json({message:"O nome do ecoponto é obrigatório"});
            }
            if(latitude === undefined || latitude === null || latitude === "" ||
               longitude === undefined || longitude === null || longitude === ""){
                return res.status(400).json({message:"Latitude e longitude são obrigatórias"});
            }
            const lat = Number(latitude);
            const lng = Number(longitude);
            if(Number.isNaN(lat) || lat < -90 || lat > 90){
                return res.status(400).json({message:"Latitude inválida (deve estar entre -90 e 90)"});
            }
            if(Number.isNaN(lng) || lng < -180 || lng > 180){
                return res.status(400).json({message:"Longitude inválida (deve estar entre -180 e 180)"});
            }
            let notaInt: number | null = null;
            if(nota !== undefined && nota !== null && nota !== ""){
                notaInt = Number(nota);
                if(!Number.isInteger(notaInt) || notaInt < 0 || notaInt > 5){
                    return res.status(400).json({message:"A nota deve ser um número inteiro entre 0 e 5"});
                }
            }
            //inserir no banco de dados
            const ecoponto = await prisma.ecoponto.create({
                data:{
                    nome: nome.trim(),
                    latitude: String(latitude),
                    longitude: String(longitude),
                    descricao: descricao ?? null,
                    cep: cep ?? null,
                    logradouro: logradouro ?? null,
                    numero: numero !== undefined && numero !== null ? String(numero) : null,
                    bairro: bairro ?? null,
                    cidade: cidade ?? null,
                    uf: uf ?? null,
                    nota: notaInt,
                },
            });
            return res.status(201).json(ecoponto);
        } catch (error) {
            console.error(error);
            return res.status(500).json({message:"Erro ao cadastrar o ecoponto"});
        }
        
    }
    static async getEcopontos(req:Request,res:Response){
        try
        {
            const ecopontos = await prisma.ecoponto.findMany({
                include:{ lixeiras: true },
                orderBy:{ criadoEm: "desc" },
            });
            return res.status(200).json(ecopontos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({message:"Erro ao buscar os ecopontos"});
        }
    }
}
