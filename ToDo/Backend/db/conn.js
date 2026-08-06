import mongoose from "mongoose";

// Função para criar a conexão com o banco
// Duas formas de conexão, testar qual funciona na máquina
async function main() {
    // await mongoose.connect('mongodb://localhost:27017/ToDo');
    await mongoose.connect('mongodb://127.0.0.1.27017/ToDo');
    console.log("Conectou MongoDb");
}

// Caso não conseguir conectar
main().catch((err) => {
    console.log(err)
});

export default mongoose;