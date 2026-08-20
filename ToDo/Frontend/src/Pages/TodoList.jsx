import React, { useState, useEffect } from 'react';
import { getTodos } from '../api/Todo';
import TodoItem from '../Components/TodoItem.jsx';
import { Link } from 'react-router-dom';
export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetch = async () => {
        try {
            setLoading(true)
            const res = await getTodos()
            setTodos(res.data.Tarefas)
        } catch (error) {
            setError(error)
            alert(error)
        }
        finally {
            setLoading(false)
        }
    } // Fim da Função fetch
    useEffect(() => { fetch() }, []);
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <Link to='/new' className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all flex items-center gap-2">Nova Tarefa</Link>

            </div>
            {loading && <p>Carregando...</p>}
            {error && <p className="text-red-600">{error}</p>}
            <div className="space-y-3">
                {todos?.length === 0 && !loading ? (
                    <p className="text-gray-500">Nenhuma Tarefa encontrada!</p>
                ) : (
                    todos?.map(todo => (
                        <TodoItem
                            key={todo._id}
                            todo={todo}

                        />
                    ))
                )}
            </div>
        </div>
    );
}
