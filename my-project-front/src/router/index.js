/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from '../store/index';

Vue.use(VueRouter);

const SignIn = () => import(/* webpackChunkName: "signup" */ "../views/SignIn.vue");
const SignUp = () => import(/* webpackChunkName: "signup" */ "../views/SignUp.vue");
const Profile = () => import(/* webpackChunkName: "proflie" */ "../views/Profile.vue");
const Likeds = () => import(/* webpackChunkName: "liked" */ "../views/LikedMovies.vue");
const Comments = () => import(/* webpackChunkName: "liked" */ "../views/UserComments.vue");

const isLoggedIn = () => (to,from,next) => {
  if(store.state.userStore.me) {
    return next();
  }
  next('/error');
}
const isNotLoggedIn = () => (to,from,next) => {
  if(!store.state.userStore.me) {
    return next();
  }
  next('/error');
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "SignIn",
    component: SignIn,
    beforeEnter: isNotLoggedIn(),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    beforeEnter: isNotLoggedIn(),
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: isLoggedIn(),
  },
  {
    path: "/profile/liked",
    name: "Likeds",
    component: Likeds,
    beforeEnter: isLoggedIn(),
  },
  {
    path: "/profile/comments",
    name: "Comments",
    component: Comments,
    beforeEnter: isLoggedIn(),
  },
  {
    path: "/movie/:id",
    name: "Movie",
    component: () =>
    import(/* webpackChunkName: "liked" */ "../views/Movie.vue"),
  },
  {
    path: '/*',
    name: "Error",
    component: () =>
    import(/* webpackChunkName: "error" */ "../views/Error.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
