import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAppStore, useAuthStore } from '@/stores';
import appSetting from '@/app-setting';

import {
    HomeView,
    Login
} from "@views"

const routes: RouteRecordRaw[] = [
    // dashboard
    { path: '/', name: 'home', component: HomeView },
    // Login
    { path: '/login', name: 'login', component: Login, meta: { layout: 'auth' } },
];

const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
    },
});

router.beforeEach((to, from, next) => {
    const store = useAppStore();
    const auth = useAuthStore();
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    if (to?.meta?.layout == 'auth') {
        store.setMainLayout('auth');
    } else {
        store.setMainLayout('app');
    }

    /* if (authRequired && !auth.isLogin) {
        auth.setReturnUrl(to.fullPath);
        return next({path: '/login'});
    } */

    next(true);
});
router.afterEach((to, from, next) => {
    appSetting.changeAnimation();
});
export default router;
