import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript bundle
import 'vuetify/styles'; // Import Vuetify styles
import { createVuetify } from 'vuetify'; // Import the createVuetify function
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
});

// Create Pinia store instance
const pinia = createPinia();


createApp(App)
  .use(router)
  .use(pinia) // Use the Pinia store instance
  .use(vuetify) // Use the Vuetify instance
  .mount('#app');
