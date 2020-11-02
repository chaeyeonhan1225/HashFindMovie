<!-- eslint-disable -->
<template>
  <v-container v-if="me">
    <h1 style="display: inline">{{me.nick}}님의 한줄평 목록</h1>
    <span class="ml-1">{{me.cnt}}</span>
      <CommentsPreview :comments="me.comments"/>
      <div class="text-center mt-3">
        <v-pagination
          v-model="page"
          :length="parseInt(me.cnt / 10, 10) + 1"
          @input="nextPage()"
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
        limit: 10,
      });
    },
    nextPage() {
      console.log("next");
      return this.$store.dispatch('userStore/loadComments',{
        offset: (this.page - 1) * 10,
        limit: 10,
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