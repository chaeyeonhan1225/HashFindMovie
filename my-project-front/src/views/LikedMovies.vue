<!-- eslint-disable -->
<template>
  <div style="padding: 15px;" v-if="me">
    <h1 style="display: inline">
      <span class="mark_pen-orange" v-if="me">{{ me.nick }}</span
      >님이 좋아한 영화 목록
    </h1>
    <span>{{ this.cnt }}</span>

    <v-row v-if="me" class="mt-5">
      <template v-for="m in movies">
        <v-col cols="12" md="6" :key="m.id">
          <MovieCard :movie="m" />
        </v-col>
        <!--작업 해야함-->
      </template>
    </v-row>
    <v-pagination
      v-model="page"
      :length="parseInt(this.cnt / 10 + 1, 10)"
      @input="nextPage()"
    ></v-pagination>
  </div>
</template>

<script>
/* eslint-disable */
import MovieCard from "../components/MovieCard";
export default {
  components: {
    MovieCard,
  },
  data() {
    return {
      page: 1,
    };
  },
  methods: {
    loadLiked(offset) {
      return this.$store.dispatch("movieStore/loadLiked", {
        limit: 10,
        offset: offset,
      });
    },
    nextPage() {
      this.loadLiked((this.page - 1) * 10);
    },
  },
  created() {
    return this.loadLiked(0);
  },
  computed: {
    me() {
      return this.$store.state.userStore.me;
    },
    movies() {
      return this.$store.state.movieStore.Movies;
    },
    cnt() {
      return this.$store.state.movieStore.MoviesCount;
    },
  },
};
</script>
