import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': resolve('./src'),
        },
    },
    build: {
        target: 'esnext',
		outDir:'plc-front',
        chunkSizeWarningLimit: 600,
        rollupOptions: {
            output: {
                manualChunks: {
                    veco: ['vue', 'vue-router', 'vuex'],
                    'element-plus': ['element-plus'],
                },
            },
        },
        minify: 'terser',
        terserOptions: {
            compress: {
                //生产环境时移除console
                // drop_console: true,
                // drop_debugger: true,
            },
        },
    },
    server: {
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://10.10.30.44:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
