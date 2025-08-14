// components/CustomButton.jsx
export default function Button({ children, className = "" }) {
    return (
        <button
            type="button"
            className={`px-4 py-2 text-white rounded-sm transition-colors duration-300 cursor-pointer
                 hover:bg-white hover:text-gray-900 ${className}`}
        >
            {children}
        </button>
    );
}
