import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/user.jsx";
import { LayoutDashboard, LogIn, FlaskConical } from "lucide-react";
import Button from "../components/ui/Button";

const Login = () => {
    const { login, loginDemo } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login({ username, password });
            navigate("/");
        } catch {
            setError("Usuario/correo o contraseña incorrectos");
        } finally {
            setLoading(false);
        }
    };

    const handleDemo = () => {
        loginDemo();
        navigate("/");
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 mb-4">
                        <LayoutDashboard size={24} className="text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bienvenido de vuelta</h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Inicia sesión en tu cuenta</p>
                </div>

                {/* Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-8">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-1.5">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Usuario o correo electrónico
                            </label>
                            <input id="username" name="username" type="text" autoComplete="username" required
                                value={username} onChange={(e) => setUsername(e.target.value)}
                                className="block w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-shadow text-sm"
                                placeholder="tu_usuario o correo@ejemplo.com" />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Contraseña
                                </label>
                                <a href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                            <input id="password" name="password" type="password" autoComplete="current-password" required
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                className="block w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-shadow text-sm"
                                placeholder="••••••••" />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                            </div>
                        )}

                        <div className="flex items-center">
                            <input id="remember_me" name="remember_me" type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded" />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">Recuérdame</label>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            <LogIn size={16} />
                            {loading ? "Iniciando..." : "Iniciar Sesión"}
                        </Button>
                    </form>

                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={handleDemo}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-colors"
                        >
                            <FlaskConical size={16} />
                            Entrar como Demo (sin backend)
                        </button>
                    </div>
                </div>

                <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    ¿No tienes una cuenta?{" "}
                    <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                        Regístrate
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;