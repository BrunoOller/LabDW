import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import TodoList from "./Pages/TodoList";
import Login from "./Pages/Login";
import TodoForm from "./Pages/TodoForm";
import logoTodo from "./assets/logo-todo.png";
import { logout, getProfile } from "./api/Todo.jsx";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Executa toda vez que a página é recarregada (F5)
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await getProfile();
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log("Sessão não encontrada ou expirada:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  // Trava a renderização até validar o cookie no F5
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-3xl mx-auto mb-8">
        <nav className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">
            <Link to="/">
              <img src={logoTodo} alt="Logo ToDo" className="h-20 w-auto" />
            </Link>
          </h1>

          <div>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                Sair
              </button>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Entrar
              </Link>
            )}
          </div>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto">
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/new" element={<TodoForm />} />
          <Route
            path="/login"
            element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />}
          />
        </Routes>
      </main>
    </div>
  );
}