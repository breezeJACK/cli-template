import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupStore } from './store';
import SvgIcon from './components/SvgIcon';
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegrations } from '@sentry/integrations';
import 'virtual:svg-icons-register';
import 'virtual:windi.css';
import './styles/index.less';

// Sentry错误日志收集
if (import.meta.env.PROD && import.meta.env.MODE !== 'staging') {
  // Sentry.init({
  //   dsn: 'https://XXX@sentry.service.com/XX',
  //   integrations: [new VueIntegrations({ Vue: app, attachProps: true })]
  // })
}
const app = createApp(App);
setupRouter(app);
setupStore(app);
app.component('SvgIcon', SvgIcon);
app.mount('#app');
