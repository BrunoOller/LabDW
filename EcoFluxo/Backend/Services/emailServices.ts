import { Interface } from "node:readline";
import * as nodemailer from "nodemailer";
interface EmailUser{
    email:string;
}
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT;

//configurar o transporte do email
const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth:{
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});
export const send2FACodeEmail = async(toEmail:string, codigo:string)=>{
    await transporter.sendMail({
        from: "EcoFluxo",
        to: toEmail,
        subject: "Código de Verificação de Acesso",
        html:`
        <div style="font-family:sans-serif;
                    max-width:500px;
                    margin: 0 auto;
                    border:1px solid #e2e8f0;
                    padding: 20px;
                    border-radius:8px;">
            <h2 style="color:#1e3a8a;
                       text-align: center;
                       ">
                       Verificação em Duas Etapas
            </h2>
            <p>Você iniciou o login no EcoFluxo. 
               Use o código de segurança abaixo para concluir a 
               sua autenticação:</p>
            <div style="background-color:#f8fafc;
                        border: 1px dashed #cbd5e1;
                        padding: 15px;
                        text-align:center;
                        margin:20px 0;
                        border-radius: 6px;">
                <span style="font-size:32px;
                             font-weigth:bold;
                             letter-spacing:5px;
                             color: #1e3a8a;">
                    ${codigo} 
                </span>
            </div>
            <p style="font-size:14px;
                      color:#64748b;">
                Este código é válido por <strong> 10 minutos </strong>
                e só pode ser utilizado uma única vez.
            </p>
            <p style="font-size:12px;
                      color:#94a3b8;
                      text-align: center;">
                      Se você não tentou realizar o login, 
                      altere imediatamente a sua senha no EcoFluxo
            </p>

        </div>
        `
    });
    console.log(`E-mail de 2FA enviado com sucesso para: ${toEmail}`);
}; 