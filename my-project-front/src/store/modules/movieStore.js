/* eslint-disable */
import axios from 'axios';
import Vue from 'vue';

const movieStore = {
  namespaced: true,
  state: {
    Movies: [],
    RandomMovies: [],
    movie: null,
  },
  mutations: {
    setMovies(state, payload) {
      state.Movies = payload;
    },
    setMovie(state,payload) {
      state.movie = payload;
    },
    setRandomMovies(state,payload) {
      state.RandomMovies = payload;
    },
    loadComments(state,payload) {
      console.log("payload",payload);
      // const index = state.movie.findIndex(v => v.id == payload.movieId);
      Vue.set(state.movie,'comments',payload.comments);    
    },
    addComment(state,payload) {
      state.movie.comments.unshift(payload);
    },
    removeComment(state,payload) {
      const index = state.movie.comments.findIndex(v => v.id == payload.commentId);
      state.movie.comments.splice(index,1);
    },
    likeMovie(state,payload) {
      console.log(payload);
      const index = state.Movies.findIndex(v => v.id == payload.movieId);
      state.Movies[index].Likers.push({
        id: payload.userId
      });
    },
    unlikeMovie(state,payload) {
      console.log(payload);
      const index = state.Movies.findIndex(v => v.id == payload.movieId);
      const user = state.Movies[index].Likers.findIndex(v => v.id == payload.userId);
      state.Movies[index].Likers.splice(user,1);
    },
  },
  actions: {
    loadMovies({
      commit
    }) {
      axios.get('http://localhost:3001/movies/today', {
        withCredentials: true,
      }).then((result) => {
        console.log(result.data);
        commit('setMovies', result.data);
      }).catch((error) => {
        console.error(error);
      });
    },
    loadMovie({ commit },payload){
      axios.get(`http://localhost:3001/post/movie/${payload.movieId}`,{
        withCredentials: true,
      }).then((result)=>{
        console.log(result.data);
        commit('setMovie',result.data);
      }).catch((error)=>{
        console.error(error);
      });
    },
    likeMovie({
      commit
    }, payload) {
      axios.post(`http://localhost:3001/post/${payload.movieId}/like`,{},{
        withCredentials: true,
      }).then((result)=>{
        console.log("좋아요 성공!");
        console.log(result.data);
        commit('likeMovie', result.data);
      }).catch((error)=>{
        console.error(error);
      })
      
    },
    removeLike({
      commit
    }, payload) {
      axios.delete(`http://localhost:3001/post/${payload.movieId}/like`,{
        withCredentials: true,
      }).then((result)=>{
        commit('unlikeMovie', result.data);
      }).catch((error)=>{
        console.error(error);
      });
    },
    addComment({
      commit
    }, payload) {
      axios.post('http://localhost:3001/post/comment', payload, {
        withCredentials: true
      }).then((result) => {
        commit('addComment',result.data);
      }).catch((error) => {
        console.error(error);
      });
      // commit('addComment',payload);
    },
    removeComment({ commit }, payload ) {
      axios.delete(`http://localhost:3001/post/comment/${payload.commentId}`,{
        withCredentials: true,
      }).then((result)=>{
        console.log(result.data);
        commit('removeComment',result.data);
      }).catch((error)=>{
        console.error(error);
      });
    },
    loadLiked({ commit }, payload) {
      axios.get(`http://localhost:3001/profile/movie?limit=${payload.limit}&offset=${payload.offset}`,{
          withCredentials: true,
      }).then((result)=>{
          commit('setMovies',result.data);
      }).catch((error)=>{
          console.error(error);
      })
    },
    loadComments({
      commit
    }, payload) {
      console.log(payload);
      axios.get(`http://localhost:3001/post/${payload.movieId}/comments`, {
        withCredentials: true,
      }).then((result) => {
        console.log("fetchComments");
        console.log(result.data);
        commit('loadComments', {
          movieId: payload.movieId,
          data: result.data
        });
      }).catch((error) => {
        console.error(error);
      });
    }
  },
};

export default movieStore;