<template>
  <div>
    <!-- Tombol untuk menambahkan buku -->
    <button 
      class="btn btn-primary mb-3" 
      @click="goToCreate">
      Add Book
    </button>

    <!-- Tabel Bootstrap 5 -->
    <table class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Author</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in books" :key="book.id">
          <td>{{ index + 1 }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>
            <button 
              class="btn btn-info btn-sm me-2" 
              @click="viewDetail(book)">
              View
            </button>
            <button 
              class="btn btn-warning btn-sm me-2" 
              @click="editBook(book)">
              Edit
            </button>
            <button 
              class="btn btn-danger btn-sm" 
              @click="deleteBook(book.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modal for Book Details -->
  <div v-if="detailDialog" class="modal fade show" id="bookDetailModal" tabindex="-1" aria-labelledby="bookDetailModalLabel" aria-hidden="true" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="bookDetailModalLabel">Book Details</h5>
          <button type="button" class="btn-close" @click="closeDetailModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p><strong>Title:</strong> {{ selectedBook.title }}</p>
          <p><strong>Author:</strong> {{ selectedBook.author }}</p>
          <p><strong>Description:</strong> {{ selectedBook.description }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeDetailModal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal for Add Book -->
  <div v-if="addDialog" class="modal fade show" id="addBookModal" tabindex="-1" aria-labelledby="addBookModalLabel" aria-hidden="true" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addBookModalLabel">Add New Book</h5>
          <button type="button" class="btn-close" @click="closeAddModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleAdd">
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input type="text" class="form-control" id="title" v-model="newBook.title" required />
            </div>
            <div class="mb-3">
              <label for="author" class="form-label">Author</label>
              <input type="text" class="form-control" id="author" v-model="newBook.author" required />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea class="form-control" id="description" v-model="newBook.description" rows="3"></textarea>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-success">Add Book</button>
              <button type="button" class="btn btn-secondary" @click="closeAddModal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal for Edit Book -->
  <div v-if="dialog" class="modal fade show" id="editBookModal" tabindex="-1" aria-labelledby="editBookModalLabel" aria-hidden="true" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editBookModalLabel">Edit Book</h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleUpdate">
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input type="text" class="form-control" id="title" v-model="selectedBook.title" required />
            </div>
            <div class="mb-3">
              <label for="author" class="form-label">Author</label>
              <input type="text" class="form-control" id="author" v-model="selectedBook.author" required />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea class="form-control" id="description" v-model="selectedBook.description" rows="3"></textarea>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-success">Update Book</button>
              <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { useBookStore } from "../store";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default {
  setup() {
    const router = useRouter();
    const bookStore = useBookStore();
    const { books } = storeToRefs(bookStore);
    const selectedBook = ref(null);
    const newBook = ref({
      title: "",
      author: "",
      description: "",
    });
    const dialog = ref(false); // Edit modal
    const addDialog = ref(false); // Add modal
    const detailDialog = ref(false); // Detail modal

    onMounted(() => {
      bookStore.fetchBooks();
    });

    const goToCreate = () => {
      addDialog.value = true; // Open Add Book modal
    };

    const viewDetail = (book) => {
      selectedBook.value = { ...book };
      detailDialog.value = true; // Open Detail modal
    };

  
    const editBook = (book) => {
      selectedBook.value = { ...book };
      dialog.value = true; // Open Edit modal
    };
    const closeDetailModal = () => {
      detailDialog.value = false; // Close Detail modal
    };

    const closeModal = () => {
      dialog.value = false; // Close Edit modal
    };

    const closeAddModal = () => {
      addDialog.value = false; // Close Add Book modal
    };

    const handleAdd = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to add this book?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, add it!",
        cancelButtonText: "No, cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          bookStore.createBook(newBook.value)
            .then(() => {
              newBook.value = { title: "", author: "", description: "" };
              closeAddModal();
              Swal.fire({
                title: "Added!",
                text: "The book has been added successfully.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
              }).then(() => {
                bookStore.fetchBooks();
              });
            })
            .catch((error) => {
              Swal.fire({
                title: "Error",
                text: `There was an error adding the book: ${error.message}`,
                icon: "error",
                timer: 2000,
                showConfirmButton: false,
              });
            });
        } else {
          Swal.fire({
            title: "Cancelled",
            text: "The book addition has been cancelled.",
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      });
    };

    const handleUpdate = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to update this book?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, update it!",
        cancelButtonText: "No, cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          bookStore.updateBook(selectedBook.value);
          selectedBook.value = null;
          closeModal();
          Swal.fire({
            title: "Updated!",
            text: "The book has been updated successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            bookStore.fetchBooks();
          });
        } else {
          Swal.fire({
            title: "Cancelled",
            text: "The book update has been cancelled.",
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      });
    };

    // Handle delete book
    const deleteBook = (bookId) => {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this book?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          bookStore.deleteBook(bookId)
            .then(() => {
              Swal.fire({
                title: "Deleted!",
                text: "The book has been deleted successfully.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
              }).then(() => {
                bookStore.fetchBooks();
              });
            })
            .catch((error) => {
              Swal.fire({
                title: "Error",
                text: `There was an error deleting the book: ${error.message}`,
                icon: "error",
                timer: 2000,
                showConfirmButton: false,
              });
            });
        } else {
          Swal.fire({
            title: "Cancelled",
            text: "The book deletion has been cancelled.",
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      });
    };

    return {
      books,
      goToCreate,
      viewDetail,
      editBook,
      deleteBook,
      detailDialog,
      selectedBook,
      newBook,
      dialog,
      addDialog,
      closeModal,
      closeAddModal,
      closeDetailModal,
      handleAdd,
      handleUpdate,
    };
  },
};
</script>

<style>
.swal2-container.swal2-center.swal2-backdrop-show {
    z-index: 10000;
}
</style>
