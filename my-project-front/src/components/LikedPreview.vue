<!-- eslint-disable -->
<template>
  <div>
    <v-row>
          <template v-for="m in movie">
        <v-col cols="12" md="4" :key="m.id">
          <MovieCard :movie="m" />
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
/* eslint-disable */
import MovieCard from '../components/MovieCard';

export default {
  components: {
    MovieCard
  },
  computed: {
    movie() {
      return this.$store.state.movieStore.Movies;
    }
  }
}
</script>