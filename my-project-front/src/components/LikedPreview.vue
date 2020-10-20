<!-- eslint-disable -->
<template>
  <div>
    <v-row>
      <template v-for="m in this.liked">
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
  props: {
    liked: {
      type: Array,
    }
  },
  components: {
    MovieCard
  },
}
</script>