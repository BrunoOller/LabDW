import swaggerAutogen from "swagger-autogen";
const doc = {
    info:{
        title: 'API ToDo List',
        description: 'Documentação para a geração automática dos testes'
    },
    host: 'localhost:5000',
    basePath: '/ToDo',
}
//nome do arquivo que será gerado automaticamente
const outputFile = './swagger-output.json';
//caminho para as rotas
const endpointsFiles = [
  './Routes/routesUsuario.js',
  './Routes/routesTarefa.js'
];
swaggerAutogen()(outputFile, endpointsFiles, doc);