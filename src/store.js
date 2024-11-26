import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
      token: localStorage.getItem('token') || '',
      isAuthenticated: !!localStorage.getItem('token'),
    }),
    actions: {
      async login(credentials) {
        try {
          const response = await axios.post(
            'http://localhost:3000/api/auth/login',
            credentials,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          this.token = response.data.data.token;
          this.isAuthenticated = true;
          localStorage.setItem('token', this.token);
        } catch (error) {
          if (error.response) {
            console.error('Login failed:', error.response.data);  // Log the detailed error
            throw new Error(error.response.data.message || 'Unknown error');
          } else {
            console.error('Login failed:', error);
            throw new Error('Login failed. Please try again later.');
          }
        }
      },
      logout() {
        this.token = '';
        this.isAuthenticated = false;
        localStorage.removeItem('token');
      },
    },
  });

export const useBookStore = defineStore('book', {
  state: () => ({
    books: [],
    selectedBook: null,
  }),
  actions: {
    async fetchBooks() {
      const response = await axios.get('http://localhost:3000/api/books');
      this.books = response.data.books;
    },
    async fetchBook(id) {
      const response = await axios.get(`http://localhost:3000/api/books/${id}`);
      this.selectedBook = response.data;
    },
    async createBook(book) {
      try {
        await axios.post("http://localhost:3000/api/books", book, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        // Refresh the books list after adding a new book
        await this.fetchBooks();
      } catch (error) {
        console.error("Error creating book:", error);
      }
    },
      updateBook(book) {
        const bookId = book.id;
        const token = localStorage.getItem('token');  // or wherever you store your token
        
        axios
          .put(`http://localhost:3000/api/books/${bookId}`, {
            title: book.title,
            author: book.author,
            description: book.description,
          }, {
            headers: {
              Authorization: `Bearer ${token}`  // Add token in headers
            }
          })
          .then(response => {
            // Handle the response accordingly
            this.fetchBooks();
          })
          .catch(error => {
            console.error('Error updating book:', error.response);
            // Handle the error (e.g., show an alert or message)
          });
      },      
      async deleteBook(id) {
        await axios.delete(`http://localhost:3000/api/books/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        this.fetchBooks();
      },
  },
});
