import { createRouter, createWebHistory } from 'vue-router';
import authGuard from '../guard/auth';

const routes = [
    { path: '/', titule: '', component: () => import('../components/RegistroHotel.vue') },
    { path: '/reserva', titule: '', component: () => import('../components/ListaReserva.vue'), beforeEnter: authGuard },
    { path: '/crear-reserva', titule: '', component: () => import('../components/CrearReserva.vue'), beforeEnter: authGuard },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;