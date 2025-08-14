/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: { // ✅ Use 'extend' instead of completely overriding
            colors: {
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                // Your custom colors are now added to the default palette
            },
            fontFamily: {
                timeless: ['Timeless', 'system-ui', 'sans-serif'],
                Raleway: ['Raleway', 'system-ui', 'sans-serif'],
                sans: ['Timeless', 'system-ui', 'sans-serif'], // Override default sans
            },

        },
    },
    plugins: [],
}
