import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from "./Vuetify";
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
