import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Lock, Mail, ArrowLeft } from "lucide-react";
import Button from "../components/ui/Button";
import { useNotifications } from "../context/NotificationsContext";
import { AuthService } from "../services/AuthService";

export default function Login() {
  const [emailUser, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Redirect to home if user is already logged in
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { token } = await AuthService.login(emailUser, password);
      await login(token);

      addNotification({
        type: "success",
        title: "Sucesso!",
        message: "Login realizado com sucesso.",
        duration: 2000,
      });

      // Clear the input fields
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error: any) {
      console.error("Login error:", error);

      const msg =
        error?.status !== 401
          ? "Login não realizado. Tente novamente em alguns instantes."
          : "Email/Usuário ou senha incorretos.";

      setError(msg);
      addNotification({
        type: "error",
        title: "Erro ao efetuar login!",
        message: msg,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Back to home link */}
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8"
        >
          <ArrowLeft size={16} className="mr-1" />
          Voltar ao início
        </Link>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bem vindo de volta</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Ainda não possui conta?{" "}
            <Link
              to="/register"
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Registre-se
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-soft sm:rounded-xl sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email / Usuário
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="emailUser"
                  name="emailUser"
                  type="text"
                  autoComplete="email"
                  required
                  value={emailUser}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Digite seu email/usuário"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Senha
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Lembrar de mim
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Esqueceu a senha?
                </Link>
              </div>
            </div>

            {error && <div className="text-sm text-red-600 dark:text-red-400">{error}</div>}

            <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isLoading}>
              Entrar
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Ou entre com</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button type="button" variant="outline" fullWidth onClick={() => {}}>
                Google
              </Button>
              <Button type="button" variant="outline" fullWidth onClick={() => {}}>
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
