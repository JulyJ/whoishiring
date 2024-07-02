/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {
            colors: {
                muted: {
                    DEFAULT: "#999",
                    foreground: "#999",
                },
            },
        },
    },
    plugins: [],
};
