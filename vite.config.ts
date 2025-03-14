import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    server: {
        port: parseInt(process.env.VITE_APP_PORT) ?? 5000,
        strictPort: true,
    },
    plugins: [
        vue(),
        VueI18nPlugin({
            include: path.resolve(__dirname, './src/locales/**'),
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@composables': path.resolve(__dirname, './src/composables'),
            '@layouts': path.resolve(__dirname, './src/layouts'),
            '@locales': path.resolve(__dirname, './src/locales'),
            '@router': path.resolve(__dirname, './src/router'),
            '@stores': path.resolve(__dirname, './src/stores'),
            '@views': path.resolve(__dirname, './src/views'),
        },
    },
    optimizeDeps: {
        include: [],
    },
    build: {
        outDir: 'output',
        emptyOutDir: true,
    }
});
