import React, { useState, useEffect } from "react";
import { getTodos } from "../api/Todo.jsx";
import TodoItem from "../Components/TodoItem.jsx";
import { Link } from "react-router-dom";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await getTodos();
      setTodos(res.data.tarefas || []);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Erro ao carregar tarefas";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Minhas Tarefas</h2>
          <p className="text-sm text-gray-500">Gerencie suas atividades diárias</p>
        </div>
        <Link
          to="/new"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <span>+</span> Nova Tarefa
        </Link>
      </div>

      {/* Status de Carregamento e Erro */}
      {loading && (
        <div className="text-center py-8 text-gray-500 font-medium">
          Carregando tarefas...
        </div>
      )}

      {error && !loading && (
        <div className="p-4 mb-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Lista de Tarefas */}
      {!loading && !error && (
        <div className="space-y-3">
          {todos?.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              Nenhuma tarefa encontrada!
            </p>
          ) : (
            todos?.map((todo) => (
              <TodoItem key={todo._id || todo.id} todo={todo} />
            ))
          )}
        </div>
      )}
    </div>
  );
}