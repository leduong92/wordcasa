import type { Config } from 'tailwindcss';

const config: Config = {
    theme: {
        extend: {
            fontFamily: {
                hurme: ['var(--font-hurme)', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

export default config;
