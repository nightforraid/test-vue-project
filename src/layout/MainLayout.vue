<template>
    <div class="wrapper">
  <!-- Navbar -->
  <NavBar />
  <!-- /.navbar -->
   <Sidebar />
  
  <!-- Main Sidebar Container -->
 
  <div class="">
      <div class="content-wrapper">
  <!-- Content Wrapper. Contains page content -->
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Book Page</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Book</a></li>
              <li class="breadcrumb-item active">Page Book</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <div class="content mr-3 ml-3">

    <BookList />
    </div>
    </div>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <footer class="main-footer">
    <div class="float-right d-none d-sm-block">
      <b>Version</b> 3.2.0
    </div>
    <strong>Copyright &copy; 2024 <a href="https://adminlte.io">AdminLTE.io</a>.</strong> Ari Kurniawan Test
  </footer>

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->

</template>

<script>
import { onMounted } from 'vue'; 
import NavBar from './inc/NavBar.vue';
import Sidebar from './inc/Sidebar.vue';
import { useAuthStore } from '../store';
import { useRouter } from 'vue-router';
import BookList from '../components/BookList.vue';

export default {
  name: 'MainLayout',
  components: {
    NavBar, Sidebar, BookList
  },
  setup() {
      const authStore = useAuthStore();
      const router = useRouter();
  
      const logout = () => {
        authStore.logout(); // Call logout from the store
        router.push('/'); // Redirect to the login page
      };

      onMounted(() => {
        if (!localStorage.getItem('token')) {
            router.push('/'); // Redirect ke login jika token tidak ada
        }
        });
  
      return { logout };
    },
}
</script>