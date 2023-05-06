<template>
    <div>
      <div v-if="isLoading">
        <loader
          object="#ffffff"
          color1="#000000"
          color2="#767676"
          size="4"
          speed="1.2"
          bg="#343a40"
          objectbg="#343a40"
          opacity="50"
          name="circular"
        ></loader>
      </div>
      <h2
        class="text-center py-3 mb-2 uppercase text-5xl font-black text-gray-800"
      >
        Login
      </h2>
  
      <div
        class="bg-white shadow-lg rounded px-8 pt-6 pb-8 border mb-4 md:mx-auto mx-2 flex flex-col center md:w-3/4 lg:w-2/4"
      >
        <form @submit.prevent="Login">
          <div class="mb-4">
            <label
              class="block text-grey-darker text-sm font-bold mb-2"
              for="userName"
            >
              User Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="userName"
              type="userName"
              v-model="userName"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-grey-darker text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker"
              id="password"
              type="password"
              placeholder="******************"
              v-model="password"
            />
          </div>
          <div
            class="bg-red-100 border-t-4 border-red-600 rounded-b text-red-700 mb-3 px-4 py-3 shadow-md"
            role="alert"
            v-if="feedback"
          >
            <div class="flex justify-center">
              <div class="py-1 mr-3">
                <i class="material-icons">error</i>
              </div>
              <div>
                <p class="font-bold uppercase">{{ this.feedback }}</p>
              </div>
            </div>
          </div>
          <button
            class="bg-transparent hover:bg-gray-800 uppercase w-full text-gray-900 hover:text-white font-bold py-2 px-4 rounded border border-gray-600"
          >
            LogIN
          </button>
        </form>
        <div class="right mt-4 text-center">
          Don't Have a Account?
          <router-link
            class="text-blue-800 uppercase font-extrabold"
            to="/signup"
          >
            SignUp
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    name: "Login",
    props: ["error"],
    data() {
      return {
        feedback: null,
        userName: null,
        password: null,
        isLoading: false,
      };
    },
    methods: {
      async Login() {
        if (this.userName && this.password) {        
          this.feedback = null;
          this.isLoading = true;
          axios
            .post("/api/auth/login", {
              userName: this.userName,
              password: this.password,
            })
            .then((response) => {
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("userId", response.data.userId);
              localStorage.setItem("isLoggedIn", true);
              this.$router.go();
            })
            .catch((err) => {
              this.feedback = err.response.data.message;
            })
            .finally(() => {
              this.isLoading = false;
            });
        } else {
          this.feedback = "Fill the required fields";
        }
      },
    },
    created() {
      this.feedback = this.$route.params.error;
    },
  };
  </script>
  
  
  <style>
  </style>