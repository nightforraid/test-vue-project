import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Login from './components/Login.vue';
import MainLayout from './layout/MainLayout.vue';
import { useAuthStore } from './store'; 

const routes = [
  {
    path: '/home',
    component: MainLayout,
    children: [
      { path: '/home', name: 'Home', component: Home },
      { 
        path: '/logout', 
        name: 'Logout', 
        beforeEnter: () => {
          const authStore = useAuthStore();
          authStore.logout();  // Call logout from the store
          window.location.href = '/';  // Redirect to login page after logout
        }
      },
    ],
  },
  { path: '/', name: 'Login', component: Login },
  //   { path: '/', name: 'Login', component: Login },
  // { path: '/home', name: 'Home', component: Home },
  // { 
  //   path: '/logout', 
  //   name: 'Logout', 
  //   beforeEnter: () => {
  //     const authStore = useAuthStore();
  //     authStore.logout();  // Call logout from the store
  //     window.location.href = '/';  // Redirect to login page after logout
  //   }
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
