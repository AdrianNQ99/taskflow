import useDarkMode from "../services/hooks";
import { Moon, Sun } from "lucide-react";

const Header = () => {
    const [isDarkMode, toggleDarkMode] = useDarkMode();

    return (
        <header className="bg-white dark:bg-gray-900 shadow transition-colors">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">TaskFlow</h1>
                <button 
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    aria-label="Toggle dark mode"
                >
                    {isDarkMode ? (
                        <Sun size={20} className="text-yellow-500" />
                    ) : (
                        <Moon size={20} className="text-gray-700" />
                    )}
                </button>
            </div>
        </header>
    )
}
export default Header;