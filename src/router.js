import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import StatsMensuelles from './views/StatsMensuelles.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/mois',
      name: 'stats-mensuelles',
      component: StatsMensuelles
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
