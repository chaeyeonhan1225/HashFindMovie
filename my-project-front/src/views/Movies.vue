<template>
  <div class="pa-5" v-if="this.movies && this.cnt">
    <h2 style="display: inline">전체 영화 조회하기</h2>
    <span class="ml-2">{{ this.cnt }}</span>
    <div>
      <v-row>
        <template v-for="m in this.movies">
          <v-col cols="12" md="6" :key="m.id">
            <MovieCard :movie="m" />
          </v-col>
        </template>
      </v-row>
      <v-pagination
        v-model="page"
        :length="parseInt(this.cnt / 10 + 1, 10)"
        @input="nextPage()"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
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
    loadFullMovies(offset) {
      this.$store.dispatch("movieStore/loadFullMovies", {
        offset: offset,
      });
    },
    nextPage() {
      this.loadFullMovies((this.page - 1) * 10);
    },
  },
  created() {
    return this.loadFullMovies(1);
  },
  computed: {
    movies() {
      return this.$store.state.movieStore.Movies;
    },
    cnt() {
      return this.$store.state.movieStore.MoviesCount;
    },
  },
};
</script>
