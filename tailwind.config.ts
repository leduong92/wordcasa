import type { Config } from 'tailwindcss';

const config: Config = {
    theme: {
        extend: {
            fontFamily: {
                basker: ['var(--font-baskerville)'],
                helve: ['var(--font-helvetica-neue)'],
            },
        },
    },
    plugins: [],
};

export default config;
