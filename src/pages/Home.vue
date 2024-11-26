  <template>
    <div>
      <h1>Welcome to the BookList!</h1>
      
      <BookList />
      <button @click="logout">Logout</button>
      <!-- Konten halaman lainnya -->
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '../store';
  import { useRouter } from 'vue-router';
  
  import BookList from '../components/BookList.vue';
  
  export default {
    
    components: { BookList },
    setup() {
      const authStore = useAuthStore();
      const router = useRouter();
  
      const logout = () => {
        authStore.logout(); // Call logout from the store
        router.push('/'); // Redirect to the login page
      };
  
      return { logout };
    },
  };
  </script>
  