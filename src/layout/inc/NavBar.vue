<template>


    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Notifications Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-user"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <a href="#" class="dropdown-item">
            <i class="fas fa-user mr-2"></i> My Profile
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item" @click="logout">
            <i class="fas fa-sign-out-alt mr-2" @click="logout"></i> Logout
          </a>
         
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>

import { useAuthStore } from '../../store';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const authStore = useAuthStore();
      const router = useRouter();
  
      const logout = () => {
        authStore.logout(); // Call logout from the store
        router.push('/'); // Redirect to the login page
      };
  
      return { logout };
    }
}
</script>