<template>
  <v-app>
    <v-main>
      <v-row>
        <v-app-bar flat color="white">
          <v-spacer></v-spacer>
          <h1 id="title">MOVIE SHOP</h1>
          <v-spacer></v-spacer>
          <div style="display:inline-block;" v-if="me !== null">
            <span class="mark_pen-yellow">{{ me.nick }}</span>
          </div>
          <v-menu offset-y open-on-hover>
            <template v-slot:activator="{ on, attrs }">
              <div
                style="display:inline-block;margin-left:10px;margin-right: 10px"
                v-on="on"
                v-bind="attrs"
              >
                <v-avatar :color="me ? me.color : 'indigo'" size="40px"
                  ><v-icon dark>mdi-account</v-icon></v-avatar
                >
              </div>
            </template>
            <v-list v-if="me">
              <v-list-item @click="logout">
                <v-list-item-title>로그아웃</v-list-item-title>
              </v-list-item>
              <v-list-item :to="{ path: '/profile' }">
                <v-list-item-title>프로필</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-list v-else>
              <v-list-item :to="{ path: '/login' }">
                <v-list-item-title>로그인</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <template v-slot:extension>
            <v-tabs centered slider-color="blue">
              <v-tab to="/" exact>Home</v-tab>
              <v-tab to="/movies" exact>Movies</v-tab>
              <v-tab to="/login" exact>{{ menu2 }}</v-tab>
              <v-tab to="/profile" exact>Profile</v-tab>
            </v-tabs>
          </template>
        </v-app-bar>
      </v-row>
      <v-row>
        <v-col cols="12" md="2" />
        <v-col cols="12" md="8">
          <router-view></router-view>
        </v-col>
        <v-col cols="12" md="2" />
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
/* eslint-disable */
export default {
  name: "App",

  data: () => ({
    flag: false,
    menu2: "Sign In",
  }),
  created() {
    return Promise.all[this.fetchUser()];
  },
  computed: {
    me() {
      return this.$store.state.userStore.me;
    },
  },
  methods: {
    fetchUser() {
      console.log("fetchUser 실행!");
      return this.$store.dispatch("userStore/loadUser");
    },
    fetchMovies() {
      console.log("fetchMovies 실행!");
      return this.$store.dispatch("movieStore/loadMovies");
    },
    logout() {
      console.log("로그 아웃");
      this.$store.dispatch("userStore/logout");
    },
  },
};
</script>

<style>
/* eslint-disable */
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");
* {
  font-family: "Noto Sans KR", sans-serif;
}
#title {
  font-family: "Pacifico", cursive;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.mark_pen-yellow {
  background: linear-gradient(to top, #ffee58 50%, transparent 50%);
}
.mark_pen-orange {
  background: linear-gradient(to top, #ffb74d 50%, transparent 50%);
}
.mark_pen-blue {
  background: linear-gradient(to top, #80d8ff 50%, transparent 50%);
}
a {
  text-decoration: none;
}
</style>
