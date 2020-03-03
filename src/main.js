import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-socket.io'
import VueKatex from 'vue-katex'
import 'katex/dist/katex.min.css';

import VueTouchKeyboard from "vue-touch-keyboard";
import style from "vue-touch-keyboard/dist/vue-touch-keyboard.css"; // load default style
import VueGAPI from "vue-gapi";

const apiConfig = {
  apiKey: "AIzaSyALCvoVoPJFeu3_wPDAhw1Xz80O7NcE1pk",
  clientId: "642241771689-4qbdb816do7dtuiv2aidoqkaofhkb1i1.apps.googleusercontent.com",
  discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  scope: "https://www.googleapis.com/auth/spreadsheets"
  // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
};

Vue.config.productionTip = false
Vue.use(VueKatex)
Vue.use(VueTouchKeyboard);
Vue.use(VueGAPI, apiConfig);

Vue.use(new VueSocketIO({
  debug: false,
  connection: 'http://localhost:2003'
}))

export const store = {
  state:{
    testMode: true,
    autenticado: false,
  },
  atualizarTestMode(modo){
    this.state.testMode = modo;
  },
  atualizarAutenticado(auth){
    this.state.autenticado = auth;
  }
}

export const bus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
