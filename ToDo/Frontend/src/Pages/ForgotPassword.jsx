import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgot } from "../api/Todo.jsx";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [devResetToken, setDevResetToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await forgot({ email });
      // Enquanto o envio de e-mail não estiver ativo no backend, a API pode
      // retornar o token diretamente (apenas em ambiente de desenvolvimento).
      if (response?.data?.resetToken) {
        setDevResetToken(response.data.resetToken);
      }
      setSent(true);
    } catch (err) {
      // O backend responde de forma genérica mesmo em caso de erro,
      // mas tratamos falhas de rede/servidor também.
      setError(
        err.response?.data?.message ||
          "Não foi possível processar sua solicitação no momento."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full p-8 bg-white rounded-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Esqueceu a senha?
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Informe seu e-mail e enviaremos um link para redefinir sua senha.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {sent ? (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
              Se o e-mail estiver cadastrado, um link de redefinição foi enviado.
              Verifique sua caixa de entrada (e a pasta de spam).
            </div>

            {devResetToken && (
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs break-all">
                <strong className="block mb-1">Modo desenvolvimento:</strong>
                envio de e-mail ainda não está ativo no backend. Use o link abaixo
                para testar a redefinição de senha:
                <br />
                <Link
                  to={`/reset?token=${devResetToken}`}
                  className="text-blue-600 hover:text-blue-800 font-medium underline break-all"
                >
                  {window.location.origin}/reset?token={devResetToken}
                </Link>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Enviando...
                </span>
              ) : (
                "Enviar link de redefinição"
              )}
            </button>
          </form>
        )}

        <div className="mt-5 text-center pt-2 border-t border-gray-100">
          <Link
            to="/login"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
}
