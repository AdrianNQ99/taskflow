import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user.jsx";
import Button from "../components/ui/Button";

const Login = () => {
    const { login } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login({ username, password });
            navigate("/");
        } catch {
            setError("Usuario/correo o contraseña incorrectos");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-100 dark:bg-gray-800 rounded shadow">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Iniciar Sesión</h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Usuario o correo electrónico</label>
                            <input id="username" name="username" type="text" autoComplete="username" required
                                value={username} onChange={(e) => setUsername(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Usuario o correo electrónico" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Contraseña</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Contraseña" />
                        </div>
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
                    )}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember_me" name="remember_me" type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded" />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Recuérdame</label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">¿Olvidaste tu contraseña?</a>
                        </div>
                    </div>

                    <div>
                        <Button type="submit" className="w-full">
                            Iniciar Sesión
                        </Button>
                    </div>
                    <div className="text-sm text-center text-gray-900 dark:text-gray-300">
                        ¿No tienes una cuenta? <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Regístrate</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;