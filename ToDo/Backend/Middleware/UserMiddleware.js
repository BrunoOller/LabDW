import jwt from "jsonwebtoken";

const UserMiddleware = (req, res, next) => {
    try {
        // Pega o token direto dos cookies da requisição
        const token = req.cookies?.token; // "token" deve ser o mesmo nome usado no res.cookie("token", ...)

        // Se não encontrou o cookie de token
        if (!token) {
            return res.status(401).json({ message: "Não autenticado. Cookie de acesso não encontrado." });
        }

        // Valida a assinatura do token
        const secret = process.env.JWT_SECRET || "sua_chave_secreta_muito_forte";
        const decoded = jwt.verify(token, secret);

        // Anexa os dados do usuário decodificado na requisição
        req.user = decoded;

        // Permite prosseguir para o Controller
        return next();

    } catch (error) {
        return res.status(403).json({ message: "Sessão inválida ou expirada." });
    }
};

export default UserMiddleware;