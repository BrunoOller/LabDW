import { Perfil } from "@prisma/client";
import { hash } from "@node-rs/argon2";
import prisma from "../lib/prisma.js"; 

async function main() {
  console.log("Iniciando o seed...");

  const emailGestor = "gestor@ecofluxo.com";//substituir por um e-mail que você tenha acesso
  const senhaPura = "Gestor@123";//se achar necessário, troque por uma senha que queira.

  const usuarioExistente = await prisma.usuario.findUnique({
    where: { email: emailGestor },
  });

  if (usuarioExistente) {
    console.log("O usuário gestor já existe no banco de dados.");
    return;
  }

  const senhaHash = await hash(senhaPura);

  const gestor = await prisma.usuario.create({
    data: {
      nome: "Gestor EcoFluxo",
      email: emailGestor,
      senha: senhaHash,
      perfil: Perfil.GESTOR,
    },
  });

  console.log(`Gestor criado com sucesso! E-mail: ${gestor.email}`);
}

main()
  .catch((e) => {
    console.error("Erro ao executar o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });