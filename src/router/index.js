import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import AppView from '../App/AppView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/',
      component: AppView,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          props: true
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/Login.vue').then(res => res.default)
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = !!localStorage.getItem('auth__accessToken')

  if (!auth && to.path !== '/login') {
    next('/login')
  } else if (auth && to.path === '/login') {
    next(from.path)
  } else next()
})

export default router
