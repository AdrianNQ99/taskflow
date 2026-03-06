import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import useDarkMode from "../services/hooks";
import { Moon, Sun, LogOut, LayoutDashboard, User } from "lucide-react";
import { UserContext } from "../context/user.jsx";

const Header = () => {
    const [isDarkMode, toggleDarkMode] = useDarkMode();
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/80 backdrop-blur-md border-b border-slate-200 dark:border-gray-800 shadow-sm transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <LayoutDashboard size={24} className="text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                        <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                            TaskFlow
                        </span>
                    </Link>

                    {/* Right section */}
                    <div className="flex items-center gap-2">
                        {/* Dark mode toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-all"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {user ? (
                            <>
                                {/* User badge */}
                                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
                                    <div className="w-6 h-6 rounded-full bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center">
                                        <span className="text-xs font-medium text-white">
                                            {user.username.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {user.username}
                                    </span>
                                </div>

                                {/* Logout */}
                                <button
                                    onClick={() => { logout(); navigate("/login"); }}
                                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all"
                                    aria-label="Cerrar sesión"
                                    title="Cerrar sesión"
                                >
                                    <LogOut size={18} />
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => navigate("/login")}
                                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg transition-colors"
                            >
                                <User size={16} />
                                Iniciar Sesión
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;