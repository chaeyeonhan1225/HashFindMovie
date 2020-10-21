<!-- eslint-disable -->
<template>
  <v-container v-if="me">
    <h1>{{me.nick}}님의 한줄평 목록</h1>
      <CommentsPreview :comments="me.comments"/>
      <div class="text-center mt-3">
        <v-pagination
          v-model="page"
          :length="4"
        ></v-pagination>
      </div>
  </v-container>    
</template>

<script>
/* eslint-disable */
import CommentsPreview from '../components/CommentsPreview';

export default {
  components: {
    CommentsPreview
  },
  created() {
    return this.loadComments();
  },
  data() {
    return {
      page: 1,
    }
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