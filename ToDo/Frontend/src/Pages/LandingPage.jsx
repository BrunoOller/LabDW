import React from "react";
import { Link } from "react-router-dom";
import logoTodo from "../assets/logo-todo.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between p-6">
      
      <header className="max-w-4xl mx-auto w-full mb-8">
        <nav className="flex items-center justify-between py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Link to="/">
              <img src={logoTodo} alt="Logo ToDo" className="h-16 w-auto" />
            </Link>
            <span className="hidden sm:inline-block text-xs font-semibold text-gray-500 uppercase tracking-wider border-l border-gray-300 pl-3">
              Gerenciamento Colaborativo de Tarefas
            </span>
          </div>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto w-full my-auto py-6 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
          Organize suas atividades e colabore com sua equipe em um só lugar
        </h1>

        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Crie tarefas, atribua participantes e discuta o andamento dos projetos através do chat integrado em cada atividade.
        </p>
       <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors text-center"
          >
            Criar Conta Grátis
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-3 bg-white hover:bg-gray-100 text-gray-700 font-medium rounded-lg border border-gray-300 transition-colors text-center"
          >
            Já tenho uma conta
          </Link>
        </div>
       <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs">
           
            <h3 className="text-base font-bold text-gray-800 mb-1">Múltiplos Participantes</h3>
            <p className="text-gray-600 text-sm">
              Atribua responsabilidades a membros da equipe.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs">
           
            <h3 className="text-base font-bold text-gray-800 mb-1">Chat por Tarefa</h3>
            <p className="text-gray-600 text-sm">
              Converse diretamente no contexto da tarefa apenas com as pessoas envolvidas nela.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs">
            
            <h3 className="text-base font-bold text-gray-800 mb-1">Privacidade & Segurança</h3>
            <p className="text-gray-600 text-sm">
              Sessões protegidas via cookies seguros e controle de acesso restrito aos participantes.
            </p>
          </div>
        </div>
      </main>

     
      <footer className="max-w-4xl mx-auto w-full pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} ToDo App. Todos os direitos reservados.
      </footer>
    </div>
  );
}