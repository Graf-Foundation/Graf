import Vue from 'vue'
import App from './App.vue'
import SuiVue from 'semantic-ui-vue';
import router from './router';

Vue.config.productionTip = false

Vue.use(SuiVue);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
