import swaggerAutogen from 'swagger-autogen';
import fs from 'fs';
import swaggerDocs from './swagger.docs.js';

const doc = {
  info: {
    title: 'API EcoFluxo',
    version: '1.0.0',
    description: 'Documentação gerada automaticamente com swagger-autogen',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Servidor Local',
    },
  ],
  tags: swaggerDocs.tags,
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'token',
      },
    },
    schemas: swaggerDocs.components.schemas,
  },
};

// Caminho onde o arquivo JSON de saída será gerado
const outputFile = './swagger_output.json';

// Arquivos principais de rotas que o autogen deve ler para mapear os endpoints
const endpointsFiles = ['./index.ts'];

// Gera o arquivo de documentação automaticamente
swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc).then(() => {
  // O autogen descobre as rotas; aqui aplicamos por cima a descrição detalhada
  // (corpo da requisição, respostas, segurança) de Ecopontos e Lixeiras.
  const saida = JSON.parse(fs.readFileSync(outputFile, 'utf-8'));
  saida.paths = { ...saida.paths, ...swaggerDocs.paths };
  fs.writeFileSync(outputFile, JSON.stringify(saida, null, 2));
  console.log('Documentação do Swagger gerada com sucesso!');
});
