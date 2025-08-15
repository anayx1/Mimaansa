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
export function ButtonDark({ children, className = "" }) {
    return (
        <button
            className={`px-4 py-2 rounded bg-secondary text-primary text-lg font-medium
        transition-all duration-200
        border-1 border-secondary
        hover:bg-primary
        hover:text-secondary
 ${className}`}
        >
            {children}
        </button>
    );
}