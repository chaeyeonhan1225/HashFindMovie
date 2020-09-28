/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

import userStore from './modules/userStore';
import movieStore from './modules/movieStore';

export default new Vuex.Store({
  modules: {
    userStore,
    movieStore
  },
  
});
