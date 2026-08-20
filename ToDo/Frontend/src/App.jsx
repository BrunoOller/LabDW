import { useState } from 'react'
import {Routes, Route} from "react-router-dom";
import TodoForm from "./Pages/TodoForm";
import TodoList from "./Pages/TodoList";
import logoTodo from './assets/logo-todo.png';
export default function App() {
  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <header className='max-w-3xl mx-auto mb-6'>
        <nav className='flex items-center justify-between'>
          <h1 className ='text-2xl font-semibold'>
              <img src={logoTodo} alt="Logo ToDo" className="h-12 w-auto" />
          </h1>
        </nav>
      </header>
      <main className='max-w-3xl mx-auto bg-white rouded-lg shadow p-6'>
        <Routes>
          <Route path="/" element={<TodoList />}/>
          <Route path="/new" element={<TodoForm />}/>
        </Routes>
      </main>
    </div>
  )
}


