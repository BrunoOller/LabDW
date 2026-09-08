import Usuario from "../Models/Usuario.js";
import {hash, verify} from "@node-rs/argon2";
//import argon2 from "argon2";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { 
    sendPasswordResetEmail, 
} from "../Services/EmailService.js" ;
const JWT_SECRET = process.env.JWT_SECRET || "sua_chave_secreta_muito_forte";
const JWT_EXPIRATION_MS = 24*60*60*1000;//um dia em milisegundos
const RESET_TOKEN_EXPIRATION_HOURS = 1;
export default class UsuarioController
{
    static async Create(req, res)
    {
        const{nome, email, senha} = req.body;
        if(!nome || !email || !senha )
        {
            return res.status(422).json({message: "Todos os dados são obrigatórios"});
        }
        try {
            const hashPassword = await hash(senha);
            //const hashPassword = await argon2.hash(senha);
            const usuario= new Usuario({
                nome,
                email,
                senha:hashPassword
            });
            const novoUsuario = await usuario.save();
            res.status(200).json({message:"Usuario inserido com sucesso", novoUsuario});
            return;
        } 
        catch (error) {
            // 11000 é o código que o MongoDB dispara quando o 'unique: true' é violado
            if (error.code === 11000) {
                return res.status(400).json({ message: "O e-mail fornecido já está em uso." });
            }
            return res.status(500).json({ message: "Erro ao registrar usuário", error });
        }
        
    };
    static async Login(req, res) {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(422).json({ message: "Todos os dados são obrigatórios" });
    }
    try {
        const usuario = await Usuario.findOne({ email }).select('+senha');
        if (!usuario || !usuario.senha) {
            return res.status(400).json({ message: "Credenciais inválidas" });
        }

        const senhaCorreta = await verify(usuario.senha, senha);
        //const senhaCorreta = await argon2.verify(usuario.senha, senha);
        if (!senhaCorreta) {
            return res.status(400).json({ message: "Credenciais inválidas" });
        }

        const tokenPayload = {
            id: usuario._id,
            nome: usuario.nome,
            email: usuario.email
        };

        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1h" });

        
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true apenas em produção (HTTPS)
            sameSite: "lax", //
            maxAge: JWT_EXPIRATION_MS || 3600000 // 1 hora
        });

        return res.status(200).json({
            message: "Login realizado com sucesso",
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email
            },
            token
        });
    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ message: "Problema no Login", error });
    }
}

    static async ForgotPassword(req, res)
    {
        const {email} = req.body;
        if(!email)
        {
            return res.status(402).json({message:"e-mail requerido"});
        }
        try
        {
            const usuario = await Usuario.findOne({ email })
            if(!usuario)
            {
                return res.status(200).json({message:"Se o e-mail estiver cadastrado, um link será enviado"});
            }
            const resetToken = crypto.randomBytes(32).toString('hex');
            const hashToken = await hash(resetToken);
            //const hashToken = await argon2.hash(resetToken);
            const resetTokenExpiry = new Date(Date.now() + RESET_TOKEN_EXPIRATION_HOURS * 60 * 60 * 1000);
            await Usuario.findByIdAndUpdate(usuario.id, {
                resetToken: hashToken,
                resetTokenExpiry: resetTokenExpiry
            });
            /*sendPasswordResetEmail(usuario.email, resetToken).catch(err=>{
                console.error("Falha no envio do e-mail");
            });*/
            return res.status(200).json({ message: "Se o e-mail estiver cadastrado, um link será enviado1", resetToken });
        } 
        catch (error)
        {
            return res.status(200).json({message:"Se o e-mail estiver cadastrado, um link será enviado"});
        }
    };
    static async Logout(req, res)
    {
       try {
        // Limpa o cookie chamado 'jwt'
        res.clearCookie("token", {
            httpOnly: true,
            secure: false, // Altere para true se estiver em produção (HTTPS)
            sameSite: 'lax'
        });

        return res.status(200).json({ message: "Logout realizado com sucesso" });
        } catch (error) {
            return res.status(500).json({ message: "Erro ao realizar logout", error });
        }
    };
    static async ResetPassword(req, res)
    {
        const { token, novaSenha } = req.body;

        if (!token || !novaSenha) {
            return res.status(400).json({ message: "Token e nova senha são obrigatórios." });
        }

        try {
            // Busca usuários que possuem um token válido e não expirado
            // Observação: select('+resetToken +resetTokenExpiry') força a busca desses campos caso estejam ocultos no Schema
            const usuarios = await Usuario.find({
                resetTokenExpiry: { $gt: Date.now() } // $gt = Greater Than (Data de expiração maior que 'agora')
            }).select('+resetToken +resetTokenExpiry');

            let usuarioValido = null;

            // Compara o token recebido com os hashes salvos no banco
            for (const usuario of usuarios) {
                if (usuario.resetToken) {
                    const tokenValido = await argon2.verify(usuario.resetToken, token);
                    if (tokenValido) {
                        usuarioValido = usuario;
                        break;
                    }
                }
            }

            // Se nenhum usuário for encontrado com esse token válido
            if (!usuarioValido) {
                return res.status(400).json({ message: "Token inválido ou expirado." });
            }

            // Hash da nova senha
            const hashNovaSenha = await argon2.hash(novaSenha);
            //const hashNovaSenha = await hash(novaSenha);

            // Atualiza a senha e limpa o token de recuperação
            usuarioValido.senha = hashNovaSenha;
            usuarioValido.resetToken = undefined;
            usuarioValido.resetTokenExpiry = undefined;

            await usuarioValido.save();

            return res.status(200).json({ message: "Senha redefinida com sucesso!" });

        } catch (error) {
            console.error("Erro no resetPassword:", error);
            return res.status(500).json({ message: "Erro ao redefinir a senha.", error });
        }
    };
    static async Profile(req, res) {
    try {
        const userToken = req.user;
        console.log("TOKEN/PAYLOAD:", userToken);

        if (!userToken) {
            return res.status(401).json({ message: "Não autenticado" });
        }

        // Extrai o ID do usuário guardado dentro do req.user (pode ser id ou _id dependendo de como salvou no JWT)
        const userId = userToken.id || userToken._id;

        // BUSCA NO BANCO DE DADOS
        
            // O Mongoose já esconde a senha automaticamente por conta do "select: false" no Schema
            const dadosUsuario = await Usuario.findById(userId);

        if (!dadosUsuario) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        console.log("USUÁRIO DO BANCO:", dadosUsuario);                    

        // Retorna os dados do banco para o Frontend
        return res.status(200).json({ usuario: dadosUsuario });

    } catch (error) {
        console.error("Erro no Profile:", error);
        return res.status(500).json({ message: "Erro ao buscar usuário", error: error.message });
    }
    }
    static async getAllExceptLogged(req, res) {
        try {
            const usuarioLogado = req.user.id;
            const usuarios = await Usuario.find({_id:{$ne:usuarioLogado}})
            .select("nome")
            .sort({nome:1});
            return res.status(200).json(usuarios);
        }
        catch(error){
            return res.status(500).json({message:"Problema ao buscar usuários", error})
        }
    }
};
