/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                ivory: {
                    dark: '#F5E3C8',
                    DEFAULT: '#FFFAEF',
                },
                background: {
                    DEFAULT: '#040B28',
                },
                primary: {
                    light: '#6C63FF',
                    dark: '#2C3879',
                    DEFAULT: '#4B2B6E',
                },
                secondary: {
                    DEFAULT: '#00A1A4',
                },
                cherry: {
                    light: '#F18599',
                    DEFAULT: '#CB214A',
                },
            },
            fontFamily: {
                josefin: ['Josefin Sans', 'sans-serif'],
                princess: ['Square Peg', 'cursive'],
                ghost: ['Amatic SC', 'cursive'],
            },
            keyframes: {
                'progress-bar-keys': {
                    '0%': { transform: 'scaleX(0)' },
                    '10%': { transform: 'scaleX(0.1)' },
                    '20%': { transform: 'scaleX(0.2)' },
                    '30%': { transform: 'scaleX(0.3)' },
                    '40%': { transform: 'scaleX(0.4)' },
                    '50%': { transform: 'scaleX(0.5)' },
                    '60%': { transform: 'scaleX(0.6)' },
                    '100%': { transform: 'scaleX(1)' },
                },
                'ghost-levitation-keys': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-50px)' },
                },
                'chapter-title-out-keys': {
                    '0%': { opacity: 0 },
                    '50%': { opacity: 1 },
                    '100%': { opacity: 0 },
                },
                'info-menu-in-keys': {
                    '0%': { transform: 'translateY(6rem)' },
                    '100%': { transform: 'translateY(0)' },
                },
                'info-menu-out-keys': {
                    '0%': { opacity: 1 },
                    '100%': { opacity: 0 },
                },
                'dialog-menu-in-keys': {
                    '0%': { transform: 'translateX(120rem)' },
                    '100%': { transform: 'translateX(0)' },
                },
                'dialog-menu-out-keys': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(20rem)' },
                },
                'type-keys': {
                    from: {
                        width: 0,
                    },
                },
            },
            animation: {
                'progress-bar': 'progress-bar-keys 2s 2s linear infinite',
                'ghost-levitation': 'ghost-levitation-keys 2s 2s ease-in-out infinite alternate',
                'chapter-title-out': 'chapter-title-out-keys 5s 2s ease-in-out',
                'info-menu-in': 'info-menu-in-keys 0.5s ease-in-out',
                'info-menu-out': 'info-menu-out-keys 0.5s ease-in-out',
                'dialog-menu-in': 'dialog-menu-in-keys 0.5s ease-in-out',
                'dialog-menu-out': 'dialog-menu-out-keys 0.5s ease-in-out',
                'typing-slow': 'type-keys 1.6s ease-out .6s 1 normal both',
            },
            backgroundImage: {
                'lighthouse-princess-pattern': "url('assets/img/cherry-tree.png')",
            },
        },
    },
    variants: {
        fill: ['hover', 'focus'],
    },
    plugins: [],
}
