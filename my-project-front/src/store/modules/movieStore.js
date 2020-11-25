/* eslint-disable */
import axios from 'axios';
import Vue from 'vue';

const movieStore = {
  namespaced: true,
  state: {
    Movies: [],
    TodayMovies: [],
    LatestMovies: [],
    SearchResults: [],
    movie: null,
    movieComments: [],
  },
  mutations: {
    // 화면에 표시하는 영화가 여러개 일때
    setMovies(state, payload) {
      state.Movies = payload;
    },
    // 화면에 표시하는 영화가 1개 일때
    setMovie(state,payload) {
      state.movie = payload.movie;
      state.movieComments = payload.comments;
    },
    // 메인 화면의 오늘의 영화
    setTodayMovies(state,payload) {
      state.TodayMovies = payload;
    },
    // 메인 화면의 최근에 추가된 영화
    setLatestMovies(state, payload) {
      state.LatestMovies = payload;
    },
    // 메인 화면의 랜덤 영화
    setRandomMovies(state,payload) {
      state.RandomMovies = payload;
    },
    // 댓글 
    loadComments(state,payload) {
      console.log("payload",payload);
      Vue.set(state.movie,'comments',payload.comments);    
    },
    // 댓글 추가
    addComment(state,payload) {
      state.movie.comments.unshift(payload);
    },
    // 댓글 삭제
    removeComment(state,payload) {
      const index = state.movie.comments.findIndex(v => v.id == payload.commentId);
      state.movie.comments.splice(index,1);
    },
    // 영화 좋아요
    likeMovie(state,payload) {
      console.log(payload);

      let index = state.Movies.findIndex(v => v.id == payload.movieId);
      if (index >= 0) {
        console.log(index, state.Movies);
        state.Movies[index].Likers.push({
          id: payload.userId
        });
      }

      index = state.TodayMovies.findIndex(v => v.id == payload.movieId);
      if (index >= 0) {
        console.log(index, state.TodayMovies);
        state.TodayMovies[index].Likers.push({
          id: payload.userId
        });
      }
      index = state.LatestMovies.findIndex(v => v.id == payload.movieId);
      if (index >= 0) {
        console.log(index, state.LatestMovies);
        state.LatestMovies[index].Likers.push({
          id: payload.userId
        });
      }
    },
    // 영화 좋아요 취소
    unlikeMovie(state,payload) {
      console.log(payload);

      index = state.Movies.findIndex(v => v.id == payload.movieId);
      if (index >= 0) {
        console.log("Movies에서 삭제!");
        const user = state.Movies[index].Likers.findIndex(v => v.id == payload.userId);
        state.Movies[index].Likers.splice(user,1);
      }

      let index = state.TodayMovies.findIndex(v => v.id == payload.movieId);
      if (index >= 0) {
        const user = state.TodayMovies[index].Likers.findIndex(v => v.id == payload.userId);
        state.TodayMovies[index].Likers.splice(user,1);
      }

      index = state.LatestMovies.findIndex(v => v.id == payload.movieId);
      if (index >= 0) {
        const user = state.LatestMovies[index].Likers.findIndex(v => v.id == payload.userId);
        state.LatestMovies[index].Likers.splice(user,1);
      }

    },
    // 검색한 영화 정보 저장
    setResults(state, payload) {
      payload.forEach(movie => state.SearchResults.push(movie));
    }
  },
  actions: {
    loadTodayMovies({
      commit
    }) {
      axios.get('http://localhost:3001/movies/today', {
        withCredentials: true,
      }).then((result) => {
        console.log(result.data);
        commit('setTodayMovies', result.data);
      }).catch((error) => {
        console.error(error);
      });
    },
    loadLatestMovies({ commit }) {
      axios.get('http://localhost:3001/movies/latest', {
        withCredentials: true,
      }).then((result) => {
        console.log(result.data);
        commit('setLatestMovies', result.data);
      }).catch((error)=> {
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
    },
    searchMovie({ commit }, payload ) {
      console.log("실행");
      console.log(payload);
      axios.post(`http://localhost:3001/movies/search?offset=${payload.offset}`, payload, {
        withCredentials: true,
      }).then((result) => {
        console.log(result.data);
        commit('setResults', result.data);
      }).catch((error) => {
        console.error(error);
      });
    },
    registerMovie({ commit }, payload) {
      console.log("영화 등록");
      console.log(payload);
      axios.post("http://localhost:3001/movie", payload, {
        withCredentials: true,
      }).then((result) => {
        console.log(result.data);
      }).catch((error) => {
        return error;
      });
    }
  },
};

export default movieStore;