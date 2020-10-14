<!-- eslint-disable -->
<template>
  <v-container>
    <span>
      <v-text-field prepend-inner-icon="mdi-magnify" v-model="searchMessage" @click:clear="clearMessage()" clear-icon="mdi-close" clearable outlined rounded flat hide-details="true"></v-text-field>
    </span>
    <div style="margin:8px 0px">
      <span>검색 키워드</span>
      <span v-for="(node) in getNodes" :key="node">
        <v-chip color="green" small class="mx-1">{{node}}</v-chip>
      </span>
    </div>
    <span>찾으시는 영화가 없나요? <a href="/">영화 추가하기</a></span>
    <today-movie></today-movie>
  </v-container>
</template>

<script>
/* eslint-disable */
import TodayMovie from "../components/TodayMovie";
import RandomMovie from "../components/RandomMovie";

export default {
  name: "Home",
  components: {
    TodayMovie,
    RandomMovie,
  },
  data() {
    return {
      searchMessage: "",
    }
  },
  computed: {
    getNodes() {
      if(this.searchMessage){
        return this.searchMessage.split(" ");
      } else {
        return [];
      }
    }
  },
  methods: {
    clearMessage() {
      this.searchMessage = "";
    }
  }
};
</script>
