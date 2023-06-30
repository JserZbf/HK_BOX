import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': resolve('./src'),
            // '/image': resolve('src/assets/image'),
        },
    },
    base:'./',
    build: {
        target: 'esnext',
        outDir: 'plc-front',
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
        // terserOptions: {
        //     compress: {
        //         // 生产环境时移除console
        //         drop_console: true,
        //         drop_debugger: true,
        //     },
        // },
    },
    server: {
        proxy: {
            // '/api': {
            //     target: 'http://192.168.0.22:8080',
            //     changeOrigin: true,
            //     rewrite: (path) => path.replace(/^\/api/, ''),
            // },
            // '/api': {
            //     target: 'http://192.168.0.52:8080',
            //     changeOrigin: true,
            //     rewrite: (path) => path.replace(/^\/api/, ''),
            // },
            // '/api': {
            //     target: 'http://192.168.0.27:8080',
            //     changeOrigin: true,
            //     rewrite: (path) => path.replace(/^\/api/, ''),
            // },
            '/api': {
                target: 'http://192.168.0.32:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
