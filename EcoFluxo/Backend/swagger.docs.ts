// Documentação detalhada (OpenAPI 3) de Ecopontos e Lixeiras.
// É combinada ao swagger_output.json pelo swagger.ts (npm run swagger)
const respostaErro = (descricao: string) => ({
    description: descricao,
    content: {
        "application/json": {
            schema: { $ref: "#/components/schemas/Erro" },
        },
    },
});

const swaggerDocument = {
    openapi: "3.0.3",
    info: {
        title: "EcoFluxo API",
        version: "1.0.0",
        description: "Controle de ecopontos e lixeiras",
    },
    servers: [{ url: "/" }],
    tags: [
        { name: "Ecopontos", description: "Cadastro e consulta de ecopontos" },
        { name: "Lixeiras", description: "Cadastro e consulta de lixeiras" },
    ],
    paths: {
        "/ecoponto/createEcoponto": {
            post: {
                tags: ["Ecopontos"],
                summary: "Cadastrar um ecoponto (apenas GESTOR)",
                security: [{ cookieAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/EcopontoEntrada" },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "Ecoponto cadastrado",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Ecoponto" },
                            },
                        },
                    },
                    "400": respostaErro("Dados inválidos ou faltando"),
                    "402": respostaErro("Não autenticado ou perfil sem permissão"),
                    "403": respostaErro("Token inválido"),
                    "500": respostaErro("Erro interno"),
                },
            },
        },
        "/ecoponto/getEcopontos": {
            get: {
                tags: ["Ecopontos"],
                summary: "Listar todos os ecopontos (com suas lixeiras)",
                security: [{ cookieAuth: [] }],
                responses: {
                    "200": {
                        description: "Lista de ecopontos",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/EcopontoComLixeiras" },
                                },
                            },
                        },
                    },
                    "402": respostaErro("Não autenticado"),
                    "403": respostaErro("Token inválido"),
                    "500": respostaErro("Erro interno"),
                },
            },
        },
        "/lixeira/createLixeira": {
            post: {
                tags: ["Lixeiras"],
                summary: "Cadastrar uma lixeira (apenas GESTOR)",
                security: [{ cookieAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/LixeiraEntrada" },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "Lixeira cadastrada",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Lixeira" },
                            },
                        },
                    },
                    "400": respostaErro("Dados inválidos ou faltando"),
                    "402": respostaErro("Não autenticado ou perfil sem permissão"),
                    "403": respostaErro("Token inválido"),
                    "404": respostaErro("Ecoponto não encontrado"),
                    "500": respostaErro("Erro interno"),
                },
            },
        },
        "/lixeira/getLixeiras": {
            get: {
                tags: ["Lixeiras"],
                summary: "Listar todas as lixeiras (com id e nome do ecoponto)",
                security: [{ cookieAuth: [] }],
                responses: {
                    "200": {
                        description: "Lista de lixeiras",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/LixeiraComEcoponto" },
                                },
                            },
                        },
                    },
                    "402": respostaErro("Não autenticado"),
                    "403": respostaErro("Token inválido"),
                    "500": respostaErro("Erro interno"),
                },
            },
        },
    },
    components: {
        securitySchemes: {
            cookieAuth: { type: "apiKey", in: "cookie", name: "token" },
        },
        schemas: {
            Erro: {
                type: "object",
                properties: { message: { type: "string", example: "Mensagem do erro" } },
            },
            EcopontoEntrada: {
                type: "object",
                required: ["nome", "latitude", "longitude"],
                properties: {
                    nome: { type: "string", example: "Ecoponto Praça Central" },
                    latitude: { type: "string", example: "-22.2967" },
                    longitude: { type: "string", example: "-48.5584" },
                    descricao: { type: "string", example: "Ao lado da praça" },
                    cep: { type: "string", example: "17201-000" },
                    logradouro: { type: "string", example: "Rua das Flores" },
                    numero: { type: "string", example: "100" },
                    bairro: { type: "string", example: "Centro" },
                    cidade: { type: "string", example: "Jaú" },
                    uf: { type: "string", example: "SP" },
                    nota: { type: "integer", minimum: 0, maximum: 5, example: 4 },
                },
            },
            Ecoponto: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    nome: { type: "string" },
                    latitude: { type: "string" },
                    longitude: { type: "string" },
                    descricao: { type: "string", nullable: true },
                    cep: { type: "string", nullable: true },
                    logradouro: { type: "string", nullable: true },
                    numero: { type: "string", nullable: true },
                    bairro: { type: "string", nullable: true },
                    cidade: { type: "string", nullable: true },
                    uf: { type: "string", nullable: true },
                    nota: { type: "integer", nullable: true },
                    criadoEm: { type: "string", format: "date-time" },
                },
            },
            EcopontoComLixeiras: {
                allOf: [
                    { $ref: "#/components/schemas/Ecoponto" },
                    {
                        type: "object",
                        properties: {
                            lixeiras: {
                                type: "array",
                                items: { $ref: "#/components/schemas/Lixeira" },
                            },
                        },
                    },
                ],
            },
            LixeiraEntrada: {
                type: "object",
                required: ["uuid_sensor", "tipo", "volume_max", "nivel_cheio", "ecoponto_id"],
                properties: {
                    uuid_sensor: { type: "string", example: "a1b2c3d4-sensor-01" },
                    tipo: {
                        type: "string",
                        enum: ["PLASTICO", "VIDRO", "PAPEL", "METAL", "ORGANICO"],
                        example: "PLASTICO",
                    },
                    volume_max: { type: "integer", minimum: 1, example: 100 },
                    nivel_cheio: { type: "integer", minimum: 1, example: 80 },
                    ecoponto_id: { type: "integer", minimum: 1, example: 1 },
                },
            },
            Lixeira: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    uuid_sensor: { type: "string" },
                    tipo: {
                        type: "string",
                        enum: ["PLASTICO", "VIDRO", "PAPEL", "METAL", "ORGANICO"],
                    },
                    volume_max: { type: "integer" },
                    nivel_cheio: { type: "integer" },
                    ecoponto_id: { type: "integer" },
                    criadoEm: { type: "string", format: "date-time" },
                },
            },
            LixeiraComEcoponto: {
                allOf: [
                    { $ref: "#/components/schemas/Lixeira" },
                    {
                        type: "object",
                        properties: {
                            ecoponto: {
                                type: "object",
                                properties: {
                                    id: { type: "integer" },
                                    nome: { type: "string" },
                                },
                            },
                        },
                    },
                ],
            },
        },
    },
};

export default swaggerDocument;
