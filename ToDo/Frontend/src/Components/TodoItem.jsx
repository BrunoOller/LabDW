import React from "react";
export default function TodoItem({todo}){
    return(
        <div className="flex flex-col sm:flex-row sm:items-center 
            sm:justify-between p-3 border rounded hover:shadow-sm" >
                <div>
                    <div className="font-medium">{todo.titulo}</div>
                    <div className="text-sm text-gray-600">{todo.descricao}</div>
                    <div className="text-sm">Data Limite:{new Date(todo.dataLimite).toLocaleDateString()}</div>
                    <div className="text-sm">Situação:{todo.situacao}</div>
                </div>
        </div>
    );
}