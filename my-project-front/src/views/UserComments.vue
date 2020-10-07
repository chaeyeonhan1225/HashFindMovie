<!-- eslint-disable -->
<template>
  <v-container v-if="me">
    <h1>{{me.nick}}님의 한줄평 목록</h1>
    <template v-for="c in me.comments">
      <Comment :comment="c" :key="c.id"/>
    </template>
  </v-container>    
</template>

<script>
/* eslint-disable */
import Comment from '../components/Comment';

export default {
  components: {
    Comment
  },
  created() {
    return this.loadComments();
  },
  methods: {
    loadComments() {
      return this.$store.dispatch('userStore/loadComments',{
        offset: 0,
        limit: 100,
      });
    }
  },
  computed: {
    me() {
      return this.$store.state.userStore.me;
    }
  }
}
</script>