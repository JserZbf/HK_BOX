import { createApp } from 'vue';
import router from './router/router';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'normalize.css';
import App from './App.vue';

createApp(App).use(router).use(ElementPlus, { locale: zhCn }).mount('#app');
