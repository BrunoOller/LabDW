// Importando a conexão
import mongoose from "../db/conn.js";

const { Schema } = mongoose;
const tarefaSchema = new Schema({
    // Criando elementos
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    dataLimite: {
        type: Date,
        required: true
    },
    situacao: {
        type: String,
        required: true
    }
}, {timestamps: true});
const Tarefa = mongoose.model('Tarefa', tarefaSchema);

export default Tarefa;