import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-socket.io'
import VueKatex from 'vue-katex'
import 'katex/dist/katex.min.css';

import VueTouchKeyboard from "vue-touch-keyboard";
import style from "vue-touch-keyboard/dist/vue-touch-keyboard.css"; // load default style

Vue.config.productionTip = false
Vue.use(VueKatex)
Vue.use(VueTouchKeyboard);

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:2003'
}))

export const store = {
  testMode: true,
  atualizarTestMode(modo){
    this.testMode = modo;
  }
}

export const bus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
