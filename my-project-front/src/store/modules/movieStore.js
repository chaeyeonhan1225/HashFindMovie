/* eslint-disable */
import axios from 'axios';
import Vue from 'vue';

const movieStore = {
  namespaced: true,
  state: {
    Movies: [],
    // {
    //   mno: 1,
    //   title: "알라딘",
    //   subtitle: "알라딘(2019)",
    //   content: `머나먼 사막 속 신비의 아그라바 왕국의 시대.
    //   좀도둑 ‘알라딘’은 마법사 ‘자파’의 의뢰로 마법 램프를 찾아 나섰다가 주인에게 세 가지 소원을 들어주는 지니를 만나게 되고, 자스민 공주의 마음을 얻으려다 생각도 못했던 모험에 휘말리게 되는데…`,
    //   img_url: "https://t1.daumcdn.net/movie/88258c0a1ca642c484d605331c56540d1555463464954",
    //   tags: ["# 어드벤처","# 판타지"],
    //   likes: 0,
    //   comments: [],
    // },
    // {
    //   mno: 2,
    //   title: "인터스텔라",
    //   subtitle: "인터스텔라(2014)",
    //   content: `우린 답을 찾을 거야, 늘 그랬듯이
    //   세계 각국의 정부와 경제가 완전히 붕괴된 미래가 다가온다.
    //   지난 20세기에 범한 잘못이 전 세계적인 식량 부족을 불러왔고, NASA도 해체되었다.
    //   이때 시공간에 불가사의한 틈이 열리고, 남은 자들에게는 이 곳을 탐험해 인류를 구해야 하는 임무가 지워진다.
    //   사랑하는 가족들을 뒤로 한 채 인류라는 더 큰 가족을 위해, 그들은 이제 희망을 찾아 우주로 간다.`,
    //   img_url: "https://t1.daumcdn.net/cfile/220AC74E5451BF6007",
    //   tags: ["# SF"],
    //   likes: 0,
    //   comments: [],
    // },
    // {
    //   mno: 3,
    //   title: "어바웃타임",
    //   subtitle: "어바웃타임(2013)",
    //   content: "모태솔로 팀(돔놀 글리슨)은 성인이 된 날, 아버지(빌 나이)로부터 놀랄만한 가문의 비밀을 듣게 된다.바로 시간을 되돌릴 수 있는 능력이 있다는 것!그것이 비록 히틀러를 죽이거나 여신과 뜨거운 사랑을 할 수 는 없지만,여자친구는 만들어 줄 순 있으리..",
    //   img_url: "https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/5p1N/image/VMaqJT0yJFy7AY3fa4WIbvYD82A.jpg",
    //   tags: ["# 로맨스"],
    //   likes: 0,
    //   comments: [],
    // }

  },
  mutations: {
    setMovies(state, payload) {
      state.Movies = payload;
    },
    loadComments(state,payload) {
      console.log("payload",payload);
      const index = state.Movies.findIndex(v => v.id == payload.movieId);
      Vue.set(state.Movies[index],'comments',payload.data);
    },
  },
  actions: {
    loadMovies({
      commit
    }) {
      axios.get('http://localhost:3001/post/movie', {
        withCredentials: true,
      }).then((result) => {
        console.log(result.data);
        commit('setMovies', result.data);
      }).catch((error) => {
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
        commit('removeLike', payload);
      }).catch((error)=>{

      });
    },
    addComment({
      commit
    }, payload) {
      axios.post('http://localhost:3001/post/comment', payload, {
        withCredentials: true
      }).then((result) => {
        commit('loadComments',{
          movieId: payload.movieId,
          data: result.data
        });
      }).catch((error) => {
        console.error(error);
      });
      // commit('addComment',payload);
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