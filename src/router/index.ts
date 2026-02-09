import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/login.vue';
import SignupPage from '../views/signup.vue';
import TabsPage from '../views/tabs.vue';
import DashboardPage from '../pages/dashboard.vue';
import AccountsPage from '../pages/budget.vue';
import TransactionsPage from '../pages/transactions.vue';
import SavingsPage from '../pages/epargne.vue';
import SafePage from '../pages/safe.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPage
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/tabs',
    component: TabsPage,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/tabs/dashboard'
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashboardPage
      },
      {
        path: 'accounts',
        name: 'Accounts',
        component: AccountsPage
      },
      {
        path: 'transactions',
        name: 'Transactions',
        component: TransactionsPage
      },
      {
        path: 'savings',
        name: 'Savings',
        component: SavingsPage
      },
      {
        path: 'safe',
        name: 'Safe',
        component: SafePage
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    const currentUser = localStorage.getItem('budget_user');
    if (!currentUser) {
      return { path: '/login' };
    }
  }
  return true;
});

export default router;
