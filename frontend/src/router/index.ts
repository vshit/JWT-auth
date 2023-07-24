import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      children: [
        {path: '/posts', component: import('../pages/posts/index.vue'), meta: {auth: true} }
      ]
    },
    {
      path: '/',
      children: [
        {path: '/login', component: import('../pages/auth/login.vue'), meta: {auth:false}},
        {path: '/registration', component: import('../pages/auth/registration.vue'), meta: {auth:false}}
      ]
    }
  ]
})

router.beforeEach((to,from,next) => {
  const isAuthRequired = to.matched.some((r) => r.meta.auth) 
  const acces_token = localStorage.getItem('token')
  if(!isAuthRequired) {
    next()
  } else {
    if(!acces_token) next(`/login`)
    else next()
  }
})

export default router
