<template>
  <div class="md:w-9/12 sm:w-10/12 sm:mx-auto mx-1">
    <h2 class="py-3 mb-1 ml-4 uppercase text-xl font-black text-gray-800">
      DASHBOARD
    </h2>
    <hr class="mb-5" />
    <div v-if="isLoading">
      <loader object="#000000" color1="#fccfcf" color2="#17fd3d" size="14" speed="1.2" bg="#343a40" objectbg="#999793"
        opacity="0" name="dots"></loader>
    </div>
    <div v-else>
      <div v-if="!posts.length" class="text-center text-xl uppercase">
        Looks like you have not written any posts
        <br>
        <router-link to="/add-post">
          <button
            class="hover:bg-gray-800 hover:text-white border border-gray-700 text-gray-900 py-2 px-4 rounded inline-flex items-center mt-6 justify-center shadow-md">
            <i class="material-icons mr-1">add</i>
            <span>Add a Post Now</span>
          </button>
        </router-link>
      </div>
      <div
        class="border border-gray-400 bg-white rounded-lg p-4 mb-3 shadow-sm flex flex-col justify-between leading-normal"
        v-for="post in posts" :key="post._id" v-else>
        <div class="flex items-center mb-6">
          <img class="w-10 h-10 rounded-full mr-4"
            src="https://png.pngtree.com/png-clipart/20190924/original/pngtree-vector-user-young-boy-avatar-icon-png-image_4827810.jpg"
            alt="Avatar " />
          <div class="text-sm">
            <p class="text-gray-900 leading-none">{{ post.author.userName }}</p>
            <p class="text-gray-600">{{ post.createdAt }}</p>
          </div>
        </div>
        <div class="">
          <div class="text-gray-900 font-bold text-xl mb-2">
            {{ post.title }}
          </div>
        </div>
        <div class="flex flex-wrap justify-around">
          <div class="mb-2 px-2 w-full md:w-1/3">
            <button @click="viewPost(post._id)"
              class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded inline-flex items-center justify-center w-full">
              <i class="material-icons mr-1">article</i>
              <span>View Post</span>
            </button>
          </div>
          <div class="mb-2 px-2 w-full md:w-1/3">
            <button @click="editPost(post._id)"
              class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded inline-flex items-center justify-center w-full">
              <i class="material-icons mr-1">edit</i>
              <span>Edit Post</span>
            </button>
          </div>
          <div class="mb-2 px-2 w-full md:w-1/3">
            <button @click="deletePost(post._id)"
              class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded inline-flex items-center justify-center w-full">
              <i class="material-icons mr-1">delete</i>
              <span>Delete Post</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import PostService from "@/services/post.service";
export default {
  name: "Dashboard",
  data() {
    return {
      posts: [],
      isLoading: true,
    };
  },
  async created() {
    this.posts = await PostService.getDashBoard();
    this.isLoading = false;
  },
  methods: {
    async deletePost(id) {
      this.isLoading = true;
      await PostService.deletePost(id);
      this.posts = await PostService.getDashBoard();
      this.isLoading = false
    },
    LogOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.$router.push("/login");
    },
    editPost(post_id) {
      this.$router.push({
        name: "EditPost",
        params: { id: post_id},
      });
    },
    viewPost(post_id) {
      this.$router.push({ name: "ViewPost", params: { id: post_id } });
    },
  },
};
</script>
  
<style scoped>
div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: 3bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

.delete {
  position: absolute;
  color: red;
  right: 10px;
  cursor: pointer;
}

.edit {
  position: absolute;
  color: rgb(1, 1, 73);
  right: 50px;
  cursor: pointer;
}

.article {
  position: absolute;
  color: rgb(1, 1, 73);
  right: 90px;
  cursor: pointer;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
}

h3 {
  text-transform: uppercase;
  font-weight: bolder;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

.section {
  margin-top: 20px;
}
</style>