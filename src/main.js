import { createApp } from 'vue';
import App from './App.vue';

import './assets/main.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery';
import 'popper.js';

import i18n from './i18n';

createApp(App).use(i18n).mount('#app');
