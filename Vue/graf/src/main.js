import Vue from 'vue'
import App from './App.vue'
import SuiVue from 'semantic-ui-vue';
import router from './router';
// import FomanticUI from 'vue-fomantic-ui'
// import 'fomantic-ui-css/semantic.min.css'

Vue.config.productionTip = false

Vue.use(SuiVue);
// Vue.use(FomanticUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
