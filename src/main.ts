import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import * as IonComponents from '@ionic/vue';
import { IonicVue } from '@ionic/vue';
import TopToolbar from '@/components/toolbars/TopToolbar.vue';
import BottomToolbar from '@/components/toolbars/BottomToolbar.vue';
import FormCurrency from '@/components/forms/FormCurrency.vue';
import FormInput from '@/components/forms/FormInput.vue';
import Icon from '@/components/Icon.vue';
import Btn from '@/components/Btn.vue';
import PageLink from '@/components/PageLink.vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/styles.scss';

/* Custom plugins */
import { authPlugin } from '@/plugins/AuthPlugin';
import { httpPlugin } from '@/plugins/HttpPlugin';
import { i18n } from '@/plugins/I18n';
import { store, key } from './store';
import { alertsPlugin } from '@/plugins/Alerts';
 

 
 
const app = createApp(App)
  .use(IonicVue, {
    mode: 'md', // "md" | "ios",
  })
  .use(i18n)
  .use(store, key)
  .use(alertsPlugin)
  .use(httpPlugin)
  .use(authPlugin)
  .use(router);

// register all Ionic components
Object.entries(IonComponents).forEach((entry) => {
  app.component(entry[0], entry[1] as any);
});

app.component('TopToolbar', TopToolbar);
app.component('BottomToolbar', BottomToolbar);
app.component('FormCurrency', FormCurrency);
app.component('FormInput', FormInput);
app.component('Icon', Icon);
app.component('Btn', Btn);
app.component('PageLink', PageLink);

router.isReady().then(() => {
  app.mount("#app");
});
