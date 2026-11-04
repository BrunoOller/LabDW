import prisma from "../lib/prisma.js";
import { Tipo } from "@prisma/client";
import type {Request, Response} from "express";
export default class LixeiraController{
    static async Create(req:Request,res:Response){
        try
         {
            const {uuid_sensor, tipo, volume_max, nivel_cheio, ecoponto_id} = req.body;
            //verificação dos dados obrigatórios
            if(!uuid_sensor || typeof uuid_sensor !== "string" || uuid_sensor.trim() === ""){
                return res.status(400).json({message:"O uuid do sensor é obrigatório"});
            }
            if(!tipo || !Object.values(Tipo).includes(tipo)){
                return res.status(400).json({
                    message:`Tipo inválido. Valores aceitos: ${Object.values(Tipo).join(", ")}`
                });
            }
            const volumeMax = Number(volume_max);
            const nivelCheio = Number(nivel_cheio);
            const ecopontoId = Number(ecoponto_id);
            if(volume_max === undefined || volume_max === null || !Number.isInteger(volumeMax) || volumeMax <= 0){
                return res.status(400).json({message:"volume_max deve ser um número inteiro maior que zero"});
            }
            if(nivel_cheio === undefined || nivel_cheio === null || !Number.isInteger(nivelCheio) || nivelCheio <= 0){
                return res.status(400).json({message:"nivel_cheio deve ser um número inteiro maior que zero"});
            }
            if(ecoponto_id === undefined || ecoponto_id === null || !Number.isInteger(ecopontoId) || ecopontoId <= 0){
                return res.status(400).json({message:"ecoponto_id é obrigatório e deve ser um número inteiro válido"});
            }
            //verificar se o ecoponto existe
            const ecoponto = await prisma.ecoponto.findUnique({ where:{ id: ecopontoId } });
            if(!ecoponto){
                return res.status(404).json({message:"Ecoponto não encontrado"});
            }
            //inserir no banco de dados
            const lixeira = await prisma.lixeira.create({
                data:{
                    uuid_sensor: uuid_sensor.trim(),
                    tipo,
                    volume_max: volumeMax,
                    nivel_cheio: nivelCheio,
                    ecoponto_id: ecopontoId,
                },
            });
            return res.status(201).json(lixeira);
        } catch (error) {
            console.error(error);
            return res.status(500).json({message:"Erro ao cadastrar a lixeira"});
        }
    }
    static async getLixeiras(req:Request,res:Response){
        try
        {
            const lixeiras = await prisma.lixeira.findMany({
                include:{ ecoponto:{ select:{ id:true, nome:true } } },
                orderBy:{ criadoEm: "desc" },
            });
            return res.status(200).json(lixeiras);
        } catch (error) {
            console.error(error);
            return res.status(500).json({message:"Erro ao buscar as lixeiras"});
        }
    }
}
