<template>
    <div class="md:w-9/12 sm:w-10/12 sm:mx-auto mx-1">
      <h2 class="py-3 mb-1 ml-4 uppercase text-xl font-black text-gray-800">
        Latest Posts
      </h2>
      <hr class="mb-5" />
      <div v-if="isLoading" class="loading">
      <loader object="#000000" color1="#fccfcf" color2="#17fd3d" size="12" speed="1.2" bg="#343a40" objectbg="#999793" opacity="0" name="dots"></loader>
      </div>
      <div v-else>
        <div v-if="!posts" class="text-center text-xl uppercase text-red-500 font-bold">
          Some Error Occured while Fetching Posts!!
          <br>
          </div>
        <div
          class="border border-gray-400 bg-white rounded-lg p-4 mb-3 shadow-sm flex flex-col justify-between leading-normal" v-for="post in posts" :key="post._id"
        >
          <div class="flex items-center mb-6">
            <img
              class="w-10 h-10 rounded-full mr-4"
              src="https://png.pngtree.com/png-clipart/20190924/original/pngtree-vector-user-young-boy-avatar-icon-png-image_4827810.jpg"
              alt="Avatar"
            />
            <div class="text-sm">
              <p class="text-gray-900 leading-none">{{ post.author.userName }}</p>
              <p class="text-gray-600">{{post.createdAt}}</p>
            </div>
          </div>
          <div class="">
            <div class="text-gray-900 font-bold text-xl mb-2">
              {{post.title}}
            </div>
          </div>
          <div class="flex justify-end">
            <button @click="viewPost(post._id)"
              class="hover:bg-gray-800 hover:text-white border border-gray-700 text-gray-900 py-2 px-4 rounded inline-flex items-center justify-center sm:w-1/3 w-full"
            >
              <i class="material-icons mr-1">article</i>
              <span>Read More</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import PostService from "../services/post.service";

  export default {
    name: "Home",
    data() {
      return {
        posts: [],
        isLoading : true
      };
    },
    async created() {
      this.posts = await PostService.getPosts().catch(e => console.log(e));
      console.log(this.posts)
      this.isLoading = false;
    },
    methods: {
      viewPost(post_id) {
        this.$router.push({ name: "ViewPost", params: { id: post_id } });
      },
    },
  };
  </script>
  
  <style scoped>
  #overlay-dots{
    z-index: -99999 !important;
  }
  </style>