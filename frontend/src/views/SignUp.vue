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
        SignUp
      </h2>
      <div
        class="bg-white shadow-lg rounded px-8 pt-6 pb-8 border mb-4 md:mx-auto flex flex-col center md:w-3/4 lg:w-2/4"
      >
        <form @submit.prevent="signUp">
          <div class="mb-4">
            <label
              class="block text-grey-darker text-sm font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="email"
              type="email"
              placeholder="example@test.com"
              v-model="email"
            />
          </div>
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
              type="text"
              placeholder="User Name"
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
          <div class="mb-6">
            <label
              class="block text-grey-darker text-sm font-bold mb-2"
              for="confirm_password"
            >
              Confirm Password
            </label>
            <input
              class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker"
              id="confirm_password"
              type="password"
              placeholder="******************"
              v-model="confirm_password"
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
            Signup
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    name: "SignUp",
    data() {
      return {
        feedback: null,
        userName: null,
        password: null,
        confirm_password: null,
        email: null,
        isLoading: false,
      };
    },
    methods: {
      async signUp() {
        if (this.password !== this.confirm_password) {
          this.feedback = "Passwords Dont Match";
        }
        else if (
          this.email &&
          this.password &&
          this.confirm_password
        ) {
          this.feedback = null;
          this.isLoading = true;
          axios
            .post("/api/auth/signup", {
              userName : this.userName,
              email : this.email,
              password : this.password
            })
            .then((res) => {
          this.isLoading = false;
          this.$router.push("/login");
            })
            .catch((err) => {
              this.feedback = err.response.data.message;
            });
        } else {
          this.feedback = "Fill the required fields";
        }
      },
    },
  };
  </script>
  

  
  <style>
  p.error {
    border: 1px solid #ff5b5f;
    background-color: #ffc5c1;
    padding: 10px;
    margin-bottom: 15px;
  }
  </style>