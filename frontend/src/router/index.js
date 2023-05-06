import { createWebHistory, createRouter } from "vue-router";
import Home from '@/views/Home.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/add-post",
    name: "AddPost",
    component: () => import("../views/AddPost.vue")
  },
  {
    path: "/:id",
    name: "EditPost",
    component: () => import("../views/EditPost.vue")
  },
  {
    path: "/:id",
    name: "ViewPost",
    component: () =>import("../views/ViewPost.vue"),
  },

  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import(/* webpackchunkname: "about" */ "../views/SignUp.vue")
  },
  {
    path: "/login",
    name: "Login",
    props : true,
    component: () =>
      import(/* webpackchunkname: "about" */ "../views/Login.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackchunkname: "about" */ "../views/Dashboard.vue"),
    beforeEnter : (to, from, next)=> {
      if(localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('token')){
        next()
      }
      else{
        next({name : 'Login', params : {error : "Please Login/SignUp to view your Dashboard "}})
      }
    }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router
