import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { BootstrapVue } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)


import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  timeout: 4000
};

Vue.use(Toast, options);

import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)





Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
