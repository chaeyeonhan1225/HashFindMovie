<!-- eslint-disable -->
<template>
  <div>
    <MovieCarousels />
    <v-container style="margin-bottom: 10px;margin-top: 20px">
     <h1><span class="mark_pen-yellow">오늘의 영화</span></h1>
      <v-container v-if="movieInfo.length > 0">
        <v-row>
          <v-col cols="12" md="4">
            <MovieCard :movie="movieInfo[0]"></MovieCard>
          </v-col>
          <v-col cols="12" md="4">
            <MovieCard :movie="movieInfo[1]"></MovieCard>
          </v-col>
          <v-col cols="12" md="4">
            <MovieCard :movie="movieInfo[2]"></MovieCard>
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
    
    created: function() {
      this.fetchMovies();
      console.log(this.$store.state.movieStore.Movies);
      // this.movies = this.$store.state.movieStore.Movies;
    },
    data() {
      return {
        
      };
    },
    methods: {
      fetchMovies() {
        this.$store.dispatch('movieStore/loadMovies').then((result)=>
          this.movies = this.$store.state.movieStore.Movies
        )
      }
    },
    computed: {
      movieInfo() {
        return this.$store.state.movieStore.Movies;
      },
      me() {
        return this.$store.state.userStore.me;
      },
    },
  };
</script>