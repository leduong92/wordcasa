export const languages = ['en', 'id'] as const;
export type Language = (typeof languages)[number];

export const translations: Record<Language, Record<string, string>> = {
    en: {
        home: 'Welcome to our website!',
        about: 'About Us',
        products: 'Products',
    },
    id: {
        home: 'Selamat datang di situs kami!',
        about: 'Tentang Kami',
        products: 'Produk',
    },
};
