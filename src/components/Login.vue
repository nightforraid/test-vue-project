<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
      <div class="card p-4 shadow-sm" style="width: 25rem;">
        <h4 class="text-center mb-4">Login</h4>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              id="username"
              class="form-control"
              v-model="credentials.username"
              placeholder="Enter your username"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              class="form-control"
              v-model="credentials.password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100" :disabled="isLoading">
            <span v-if="isLoading">Logging in...</span>
            <span v-else>Login</span>
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useAuthStore } from '../store';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const authStore = useAuthStore();
      const credentials = ref({
        username: '',
        password: '',
      });
      const isLoading = ref(false);
      const router = useRouter();

      if (authStore.isAuthenticated) {
        router.push('/home'); // Redirect to the home page if already authenticated
      }
  
      const login = async () => {
        if (credentials.value.username && credentials.value.password) {
          try {
            isLoading.value = true;
            await authStore.login(credentials.value);
            alert('Login successful!');
            router.push('/home'); // Navigate to the home page after successful login
          } catch (error) {
            alert(error.message || 'Login failed. Please check your credentials.');
          } finally {
            isLoading.value = false;
          }
        } else {
          alert('Please fill in both fields.');
        }
      };
  
      return { credentials, login, isLoading };
    },
  };
  </script>
  