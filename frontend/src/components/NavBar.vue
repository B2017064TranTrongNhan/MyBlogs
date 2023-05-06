<template>
  <nav
    class="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-gray-100 mb-3"
  >
    <div
      class="container px-4 mx-auto flex flex-wrap items-center justify-between"
    >
      <div
        class="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start"
      >
        <router-link
          class="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-gray-800"
          to="/"
        >
          MY BLOGS
        </router-link>
        <button
          class="text-gray-800 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          v-on:click="toggleNavbar()"
        >
          <i class="material-icons" v-if="!showMenu">menu</i>
          <i class="material-icons" v-else>menu_open</i>
        </button>
      </div>
      <div
        v-bind:class="{ hidden: !showMenu, flex: showMenu }"
        class="lg:flex lg:flex-grow items-center"
      >
        <ul class="flex flex-col lg:flex-row list-none ml-auto">
          <li class="nav-item" v-if="isLoggedIn === 'true' && hasToken">
            <router-link
              class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-800 hover:opacity-75"
              to="/add-post"
            >
              <span>Write A Post</span>
            </router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn === 'true' && hasToken ">
            <router-link
              class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-800 hover:opacity-75"
              to="/dashboard"
            >
              <span>Dashboard</span>
            </router-link>
          </li>
          <li
            class="nav-item lg:shadow-sm border-gray-700 lg:border-2 rounded-full lg:ml-3 border-double lg:bg-gray-800"
            @click="LogOut"
            v-if="isLoggedIn === 'true' && hasToken"
          >
            <router-link
              class="px-4 py-1 items-center text-xs uppercase font-bold leading-snug text-gray-800 lg:text-white"
              to="/"
            >
              <span>LogOut</span>
            </router-link>
          </li>
          <li
            class="nav-item lg:shadow-sm border-gray-700 lg:border-2 rounded-full lg:ml-3 border-double lg:bg-gray-800"
            v-else
          >
            <router-link
              class="px-4 py-1 items-center text-xs uppercase font-bold leading-snug text-gray-800 lg:text-white"
              to="/login"
            >
              <span>LogIn</span>
            </router-link>
          </li>
          <li
            class="nav-item group lg:shadow-sm border-gray-700 lg:border-2 rounded-full lg:ml-3 border-double lg:bg-gray-800"
            v-if="isLoggedIn === 'false'"
          >
            <router-link
              class="px-4 py-1 items-center text-xs uppercase font-bold leading-snug  lg:text-white"
              to="/signup"
            >
              <span>SignUp</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "green-navbar",
  data() {
    return {
      showMenu: false,
      menubar: "menu",
      isLoggedIn: localStorage.getItem("isLoggedIn"),
      hasToken : localStorage.getItem('token')
    };
  },
  // created() {
  //   isLoggedIn: localStorage.getItem("isLoggedIn");
  //   hasToken : localStorage.getItem('token')
  // },
  methods: {
    toggleNavbar: function () {
      this.showMenu = !this.showMenu;
    },
    close (e) {
      if (!this.$el.contains(e.target)) {
        this.showMenu = false
      }},
    LogOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.setItem("isLoggedIn", false);
      this.$router.go("/login");
    },
  },
   watch: {
    '$route' () {
      this.showMenu = false
    }
  },
    mounted () {
    document.addEventListener('click', this.close)
  },
  beforeDestroy () {
    document.removeEventListener('click',this.close)
  }
};
</script>
