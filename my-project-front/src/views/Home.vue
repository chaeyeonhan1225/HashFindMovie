<!-- eslint-disable -->
<template>
  <v-container>
    <today-movie></today-movie>
  </v-container>
</template>

<script>
/* eslint-disable */
import TodayMovie from "../components/TodayMovie";

export default {
  name: "Home",
  components: {
    TodayMovie
  },
};
</script>
