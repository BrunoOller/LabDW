import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createTodo} from "../api/Todo.jsx";
export default function TodoForm() {
    const[titulo,setTitulo] = useState('');
    const[descricao,setDescricao] = useState('');
    const[dataLimite,setDataLimite] = useState('');
    const[situacao,setSituacao] = useState('Pendente');
    const[saving,setSaving] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setSaving(true);
        try {
            await createTodo({titulo, descricao, dataLimite, situacao});
            navigate("/");
        } catch (error) {
            alert("Erro ao criar uma tarefa:" + (error.message || error));
        }
        finally{
            setSaving(false);
        }
    }
    return(
        <div className="max-w-xl mx-auto p-8 bg-white rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Nova Tarefa</h2>
        <form onSubmit={handleSubmit} className = "space-y-4">
            <div>
                <label className="block text-sm">Título</label>
                <input required value={titulo} onChange={e=>setTitulo(e.target.value)} className="w-full border rounded px-3 py-2"/>
            </div>
            <div>
                <label className="block text-sm">Descrição</label>
                <textarea required value={descricao} onChange={e=>setDescricao(e.target.value)} className="w-full border rounded px-3 py-2"/>
            </div>
            <div>
                <label className="block text-sm">Data Limite</label>
                <input required value={dataLimite} onChange={e=>setDataLimite(e.target.value)} type="date" className="w-full border rounded px-3 py-2"/>
            </div>
            <div className="flex itens-center gap-3">
                <button disabled={saving} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
                    {saving?"Salvando....":"Salvar"} 
                </button>
                <button type="button" onClick={()=>navigate(-1)} className="px-4 py-2 border rounded">
                    Cancelar
                </button>
            </div>
        </form>
    </div>
    );
}
