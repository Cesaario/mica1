import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

import VueKatex from 'vue-katex'
import 'katex/dist/katex.min.css';

import VueTouchKeyboard from "vue-touch-keyboard";
import style from "vue-touch-keyboard/dist/vue-touch-keyboard.css"; // load default style

Vue.config.productionTip = false
Vue.use(VueKatex)
Vue.use(VueTouchKeyboard);

export const store = {
  testMode: true,
  atualizarTestMode(modo){
    this.testMode = modo;
  }
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
