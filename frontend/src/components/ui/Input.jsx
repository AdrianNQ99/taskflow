const Input = ({ label, type = "text", value, onChange, placeholder }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-900 dark:text-gray-300 text-sm font-bold mb-2">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="shadow appearance-none border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline focus:ring-indigo-500"
            />
        </div>
    );
}
export default Input;