import axios from "axios";
import Vue from "vue";

const userStore = {
  namespaced: true,
  state: {
    me: null,
    comments: [],
    cnt: 0
  },
  mutations: {
    setMe(state, payload) {
      state.me = payload;
      // localStorage.me = payload;
      console.log("setMe 성공");
      console.log(state.me);
    },
    changeUserInfo(state, payload) {
      state.me.info = payload.info;
    },
    setComments(state, payload) {
      state.me.comments = payload.comments;
      state.me.cnt = payload.cnt;
    },
    removeComment(state, payload) {
      const index = state.me.comments.findIndex(v => v.id == payload.id);
      state.me.comments.splice(index, 1);
    }
  },
  actions: {
    loadUser({ state, commit }) {
      axios
        .get("http://localhost:3001/auth/user", {
          withCredentials: true
        })
        .then(result => {
          if (result.data.id) {
            commit("setMe", result.data);
          } else {
            console.log("로그인 하지 않은 상태!");
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    signUp({ commit, state }, payload) {
      // console.log(this);
      axios
        .post("http://localhost:3001/auth/signup", payload, {
          withCredentials: true
        })
        .then(result => {
          commit("setMe", result.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    signIn({ commit, state }, payload) {
      console.log("signIn 실행!!");
      axios
        .post("http://localhost:3001/auth/login", payload, {
          withCredentials: true
        })
        .then(result => {
          commit("setMe", result.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    changeUserInfo({ commit }, payload) {
      axios
        .patch("http://localhost:3001/auth/userinfo", payload, {
          withCredentials: true
        })
        .then(result => {
          console.log(result.data);
          commit("changeUserInfo", result.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    logout({ commit }) {
      axios
        .post(
          "http://localhost:3001/auth/logout",
          {},
          {
            withCredentials: true
          }
        )
        .then(result => {
          console.log(result.data);
          commit("setMe", null);
        })
        .catch(error => {
          console.error(error);
        });
    },
    loadComments({ commit }, payload) {
      axios
        .get(
          `http://localhost:3001/profile/comments?limit=${payload.limit}&offset=${payload.offset}`,
          {
            withCredentials: true
          }
        )
        .then(result => {
          commit("setComments", result.data);
          console.log(result.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    removeComment({ commit }, payload) {
      axios
        .delete(`http://localhost:3001/profile/comment/${payload.id}`, {
          withCredentials: true
        })
        .then(result => {
          commit("removeComment", result.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};

export default userStore;
