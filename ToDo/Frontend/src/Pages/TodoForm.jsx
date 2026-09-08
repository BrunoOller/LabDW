import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo } from "../api/Todo.jsx";
import { getUsers } from "../api/Todo.jsx"; // ou seu arquivo de API

export default function TodoForm() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataLimite, setDataLimite] = useState("");
  const [situacao, setSituacao] = useState("PENDENTE");
  const [participam, setParticipam] = useState([]);
  const [usuarios, setUsuarios] = useState([]); 
  const [loadingUsuarios, setLoadingUsuarios] = useState(true);

  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        setLoadingUsuarios(true);
        const res = await getUsers();
        const lista = res?.data?.usuarios || [];
        
        // Garante que só seta se for realmente um Array
        setUsuarios(Array.isArray(lista) ? lista : []);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
        setUsuarios([]); 
      } finally {
        setLoadingUsuarios(false);
      }
    }
    fetchUsuarios();
  }, []);

  const handleCheckboxChange = (userId) => {
    setParticipam((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createTodo({ titulo, descricao, dataLimite, situacao, participam });
      navigate("/todos");
    } catch (error) {
      alert("Erro ao criar tarefa: " + (error.response?.data?.message || error.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Nova Tarefa</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Título</label>
          <input
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <textarea
            required
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Data Limite</label>
          <input
            required
            value={dataLimite}
            onChange={(e) => setDataLimite(e.target.value)}
            type="date"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Participantes</label>

          {loadingUsuarios ? (
            <p className="text-sm text-gray-500">Carregando usuários...</p>
          ) : (
            <div className="max-h-40 overflow-y-auto border rounded p-3 space-y-2 bg-gray-50">
              
              {Array.isArray(usuarios) && usuarios.length > 0 ? (
                usuarios.map((user) => (
                  <label
                    key={user._id || user.id}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-1 rounded"
                  >
                    <input
                      type="checkbox"
                      value={user._id || user.id}
                      checked={participam.includes(user._id || user.id)}
                      onChange={() => handleCheckboxChange(user._id || user.id)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      {user.nome}{" "}
                      <span className="text-xs text-gray-400">({user.email})</span>
                    </span>
                  </label>
                ))
              ) : (
                <p className="text-sm text-gray-500 py-1">
                  Nenhum outro usuário disponível para adicionar.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pt-4">
          <button
            disabled={saving}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}