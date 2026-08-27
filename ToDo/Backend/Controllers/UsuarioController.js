// Importando Model
import Usuario from "../Models/Usuario.js";
// import argon2 from "argon2";
import { hash, verify } from "@node-rs/argon2";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export default class UsuarioController {
    static async Create(req, res) {
        const { nome, email, senha } = req.body
        if (!nome || !email || !senha) {
            return res.status(422).json({
                message: "Todos os campos são obrigatórios"
            })
        }
        try {
            // const hashPassword = await argon2.hash(senha)
            // Objeto para inserir os dados
            const usuario = new Usuario({
                nome,
                email,
                senha: hashPassword
            });
            const novoUsuario = await usuario.save();
            res.status(200).json({
                message: "Usuário inserido com sucesso!", novoUsuario
            });
            return;
        } catch (error) {
            return res.status(500).json({
                message: "Problema ao inserir um usuário", error
            });
        }
    } // Fim Create
    static async Login(req, res) {
        const { email, senha } = req.body
        if (!email || !senha) {
            return res.status(422).json({
                message: "Todos os campos são obrigatórios"
            })
        }
        try {
            // Consulta o banco para encontrar o Usuário para logar
            const usuario = await Usuario.findOne(email).select("+senha");
            if (!usuario) {
                return res.status(400).json({ message: "Credenciais inválidas" });
            }
            // Primera alternativa
            // const senhaValida = await argon2.verify(usuario.senha, senha)
            // Segunda alternativa
            const senhaValida = await verify(usuario.senha, senha)
            if (!senhaValida) {
                return res.status(400).json({ message: "Credenciais inválidas" });
            }
            const tokenPayLoad = {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email
            };
            const token = jwt.sign(tokenPayLoad, JWT_SECRET, { expiresIn: "1h" })
            res.cookie("token", token, {
                httpOnly: true,
                secure: "false",
                sameSite: "lax",
                maxAge: JWT_EXPIRATION_MS || 3600000 // 1h
            });
            return res.status(200).json({ 
                message: "Login efetuado com sucesso!",
                usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }, 
                token})
        } catch (error) {
            return res.status(500).json({
                message: "Problema ao efetuar o login", error
            });
        }
    } // Fim Create
}