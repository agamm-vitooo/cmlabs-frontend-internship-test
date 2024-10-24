module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#3e4857',
                },
                button: {
                    DEFAULT: '#134da1',
                }
            },
            animation: {
                'loading-dot': 'loading-dot 0.8s infinite ease-in-out',
            },
            keyframes: {
                'loading-dot': {
                    '0%, 100%': { transform: 'scale(0.6)', opacity: '0.4' },
                    '50%': { transform: 'scale(1)', opacity: '1' },
                },
            },
        },
    },
    plugins: [
        require('daisyui'), // Correctly placed outside the theme object
    ],
};