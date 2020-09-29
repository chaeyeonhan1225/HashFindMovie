<!-- eslint-disable -->
<template>
  <v-container>
    <span>
      <v-icon>mdi-magnify</v-icon>
      <v-text-field outlined rounded flat></v-text-field>
    </span>
    <today-movie></today-movie>
    <random-movie></random-movie>
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
};
</script>
