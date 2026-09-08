import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { reset } from "../api/Todo.jsx";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Link inválido ou expirado. Solicite uma nova redefinição de senha.");
      return;
    }

    if (novaSenha.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setError("As senhas não conferem.");
      return;
    }

    setLoading(true);
    try {
      await reset({ token, novaSenha });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Não foi possível redefinir a senha. O link pode ter expirado."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full p-8 bg-white rounded-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Redefinir senha
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Escolha uma nova senha para sua conta.
        </p>

        {!token && (
          <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
            Nenhum token de redefinição foi encontrado nesse link. Solicite um
            novo em{" "}
            <Link to="/forgot" className="underline font-medium">
              Esqueci a senha
            </Link>
            .
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {success ? (
          <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
            Senha redefinida com sucesso! Redirecionando para o login...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nova senha
              </label>
              <input
                type="password"
                required
                minLength={6}
                disabled={loading || !token}
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar nova senha
              </label>
              <input
                type="password"
                required
                minLength={6}
                disabled={loading || !token}
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !token}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Redefinindo...
                </span>
              ) : (
                "Redefinir senha"
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
