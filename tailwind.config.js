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
            },
            fontFamily: {
                josefin: ['Josefin Sans', 'sans-serif'],
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
            },
            animation: {
                'progress-bar': 'progress-bar-keys 2s 2s linear infinite',
                'ghost-levitation': 'ghost-levitation-keys 2s 2s ease-in-out infinite alternate',
                'chapter-title-in': `chapter-title-in-keys 2s ease-in-out`,
                'chapter-title-out': 'chapter-title-out-keys 5s 2s ease-in-out',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
