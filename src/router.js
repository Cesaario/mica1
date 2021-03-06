import Vue from 'vue'
import Router from 'vue-router'
import Principal from './views/Principal.vue'

Vue.use(Router)

import Planta1 from '@/plantas/Planta1'
import Config from '@/views/Config'
import SimuladorProcessos from '@/views/SimuladorProcessos'
import Osciloscopio from '@/views/Osciloscopio'
import Registrador from '@/views/Registrador'

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'principal',
      component: Principal
    },
    {
      path: '/planta1',
      component: Planta1
    },
    {
      path: '/config',
      component: Config
    },
    {
      path: '/processos',
      component: SimuladorProcessos
    },
    {
      path: '/osciloscopio',
      component: Osciloscopio
    },
    {
      path: '/registrador',
      component: Registrador
    }
  ]
});
