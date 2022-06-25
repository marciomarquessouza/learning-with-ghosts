module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                ivory: {
                    DEFAULT: '#FFFAEF',
                },
                background: {
                    DEFAULT: '#040B28',
                },
                primary: {
                    light: '#6C63FF',
                    DEFAULT: '#4B2B6E',
                },
                secondary: {
                    DEFAULT: '#00A1A4',
                },
                cherry: {
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
                'chapter-title-in-keys': {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                'chapter-title-out-keys': {
                    '0%': { opacity: 1 },
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
            },
            animation: {
                'progress-bar': 'progress-bar-keys 2s 2s linear infinite',
                'ghost-levitation': 'ghost-levitation-keys 2s 2s ease-in-out infinite alternate',
                'chapter-title-in': `chapter-title-in-keys 2s ease-in-out`,
                'chapter-title-out': 'chapter-title-out-keys 5s 2s ease-in-out',
                'info-menu-in': 'info-menu-in-keys 0.5s ease-in-out',
                'info-menu-out': 'info-menu-out-keys 0.5s ease-in-out',
                'dialog-menu-in': 'dialog-menu-in-keys 0.5s ease-in-out',
                'dialog-menu-out': 'dialog-menu-out-keys 0.5s ease-in-out',
            },
            backgroundImage: {
                'lighthouse-princess-pattern': "url('assets/img/cherry-tree.png')",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
