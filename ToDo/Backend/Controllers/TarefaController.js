// Importando Model
import Tarefa from "../Models/Tarefa";
import { Types } from "mongoose";

export default class TarefaController {
    static async Create(req, res) {
        const { titulo, descricao, dataLimite, situacao } = req.body
        if (!titulo || !descricao || !dataLimite || !situacao) {
            return res.status(422).json({
                message: "Todos os campos são obrigatórios"
            })
        }
        try {
            // Objeto para inserir os dados
            const tarefa = new Tarefa({
                titulo,
                descricao,
                dataLimite,
                situacao
            });
            const novaTarefa = await tarefa.save();
            res.status(200).json({
                message: "Tarefa inserida com sucesso!", novaTarefa
            });
            return;
        } catch (error) {
            return res.status(500).json({
                message: "Problema ao inserir uma tarefa", error
            });
        }
    } // Fim Create
    
    static async getAll(req, res) {
        try {
            const tarefas = await Tarefa.find();
            return res.status(200).json({ 
                message: "Buscar tarefas com sucesso", tarefas
            });
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao buscar as tarefas"
            });
        }
    } // Fim getAll
}