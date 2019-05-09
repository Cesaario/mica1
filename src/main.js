import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

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
