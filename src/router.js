import Vue from 'vue'
import Router from 'vue-router'
import Principal from './views/Principal.vue'

Vue.use(Router)

import Plantas from '@/views/Plantas'
import Planta1 from '@/plantas/Planta1'

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
      path:'/planta/:id',
      component: Plantas,
      children: [
        {
          path: 'planta1',
          component: Planta1
        }
      ]
    }
  ]
});
