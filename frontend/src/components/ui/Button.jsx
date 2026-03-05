const Button = ({ children, onClick, className, type = "button" }) => {
    return (
        <button 
            type={type}
            onClick={onClick}
            className={`px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-300 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors ${className}`}
        >
            {children}
        </button>
    );
}
export default Button;
