// eslint.config.mjs

import js from '@eslint/js';

import { FlatCompat } from '@eslint/eslintrc';

import path from 'path';

import { fileURLToPath } from 'url';

import pluginNext from '@next/eslint-plugin-next';

// Cần thiết để hỗ trợ các cấu hình kiểu cũ (legacy/eslintrc) trong Flat Config

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname, // Đảm bảo tệp tsconfig.json được tìm thấy đúng cách nếu bạn sử dụng TypeScript

    recommendedConfig: js.configs.recommended,
});

// Cấu hình cơ bản

const eslintConfig = [
    // 1. Tích hợp cấu hình mặc định của Next.js: 'next'

    ...compat.config({
        extends: ['eslint:recommended', 'next', 'next/core-web-vitals', 'next/typescript'],
    }), // 2. Cấu hình cho TypeScript (nếu sử dụng) // Bạn có thể thêm 'next/typescript' và các cấu hình TypeScript khác // ...compat.config({ extends: ['next/typescript'] }), // 3. Tùy chọn: Thêm các quy tắc Core Web Vitals (rất khuyến khích cho hiệu suất) // ...compat.config({ extends: ['next/core-web-vitals'] }), // 4. Tùy chọn: Thêm Prettier (nếu sử dụng) // ...compat.config({ extends: ['prettier'] }), // 5. Thêm các quy tắc tùy chỉnh (ví dụ)

    {
        plugins: {
            '@next/next': pluginNext,
        },
    },

    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],

        rules: {
            // Tắt quy tắc này nếu bạn thấy phiền khi dùng các ký tự đặc biệt trong JSX

            'react/no-unescaped-entities': 'off', // Ví dụ: Thiết lập quy tắc @next/next/no-img-element là cảnh báo thay vì lỗi

            '@next/next/no-img-element': 'warn', // Thêm các quy tắc khác của riêng bạn...

            '@next/next/google-font-display': 'warn',
        },
    }, // 6. Quy tắc bỏ qua (Ignored patterns)

    {
        ignores: ['.next/**', 'node_modules/**', 'public/**'],
    },
];

export default eslintConfig;
