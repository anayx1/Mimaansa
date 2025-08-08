/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        colors: {
            primary: 'var(--color-primary)',
            secondary: 'var(--color-secondary)',
            // You can add more colors here

        },
        fontFamily: {
            timeless: ['Timeless', 'system-ui', 'sans-serif'],
            Raleway: ['Raleway', 'system-ui', 'sans-serif'],
            sans: ['Timeless', 'system-ui', 'sans-serif'], // Make Timeless the default
        },
    },
}