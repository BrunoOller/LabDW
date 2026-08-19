// Importando
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodos } from "../api/Todo.jsx";

export default function TodoForm() {
    const[titulo,setTitulo] = useState("");
    const[descricao,setDescricao] = useState("");
    const[dataLimite,setDataLimite] = useState("");
    const[situacao,setSituacao] = useState("Pendente");
    const[saving,setSaving] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await createTodos({titulo, descricao, dataLimite, situacao})
            // navigate("/")
        } catch (error) {
            alert("Erro ao Criar Tarefa" + (error.message || error));
        }
        finally {
            setSaving(false);
        }
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm">Título</label>
                <input required value={titulo} onChange={e => setTitulo(e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
                <label className="block text-sm">Descrição</label>
                <textarea required value={descricao} onChange={e => setDescricao(e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
                <label className="block text-sm">Data Limite</label>
                <input required value={dataLimite} onChange={e => setDataLimite(e.target.value)} type="date" className="w-full border rounded px-3 py-2" />
            </div>
            <div className="flex itens-center gap-3">
                <button disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded">
                    {saving ? "Salvando...." : "Salvar"}
                </button>
                <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border rounded">
                    Cancelar
                </button>
            </div>
        </form>
    );
}
