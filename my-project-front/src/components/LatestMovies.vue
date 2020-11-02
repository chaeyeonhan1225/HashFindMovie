<!-- eslint-disable -->
<template>
  <div v-if="latestmovies">
    <!--<MovieCarousels />-->
    <v-container style="margin-bottom: 10px;margin-top: 20px">
     <h1><span class="mark_pen-orange">최근에 추가된 영화</span></h1>
      <v-container v-if="latestmovies.length > 0">
        <v-row>
          <v-col v-for="m in latestmovies" :key="m.id" cols="12" md="4">
            <MovieCard v-if = m :movie="m"></MovieCard>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable */
  import MovieCard from "./MovieCard";
  import MovieCarousels from "./MovieCarousels";

  export default {
    components: {
      MovieCard,
      MovieCarousels,
    },
    
    created() {
      return this.fetchMovies();
    },
    data() {
      return {
        
      };
    },
    methods: {
      fetchMovies() {
        this.$store.dispatch('movieStore/loadLatestMovies');
      }
    },
    computed: {
      latestmovies() {
        return this.$store.state.movieStore.LatestMovies;
      },
      me() {
        return this.$store.state.userStore.me;
      },
    },
  };
</script>