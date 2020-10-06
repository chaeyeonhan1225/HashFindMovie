<!-- eslint-disable -->
<template>
  <div>
    <v-row v-if="me">
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
  computed: {
    me() {
      return this.$store.state.userStore.me;
    },
  },
  created() {
    console.log(this.liked);
  }
}
</script>