// Importando Bibliotecas
import swaggerAutogen from "swagger-autogen";
const doc = {
    info: {
        title: "API ToDo List",
        description: "Documentação para a geração automática dos testes"
    },
    host: "localhost:5000",
    basePath: "/ToDo"
}

// Nome do arquivo que será gerado automaticamente
const outputFile = "./swagger-output.json";
// Caminho para as rotas
const endpointsFiles = [
    "./Routes/routesTarefa.js",
    "./Routes/routesUsuario.js"
]
swaggerAutogen()(outputFile, endpointsFiles, doc);