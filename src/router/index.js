import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sobre-nosotros',
    name: 'nosotros',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/contacto',
    name: 'contacto',
    component: () => import('../views/ContactView.vue')
  },
  {
    path: '/productos',
    name: 'productos',
    component: () => import('../views/ProductsView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/carrito',
    name: 'cart',
    component: () => import('../views/CartView.vue')
  },
  {
    path: '/producto/:id',
    name: 'producto',
    component: () => import('../views/ProductView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    props: true,
    component: () => import('../views/UserView.vue')
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../views/CheckoutView.vue')
  },
  {
    path: '/registro',
    name: 'registro',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/confirmacion/:id',
    name: 'confirmacion',
    component: () => import('../views/ConfirmationView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
