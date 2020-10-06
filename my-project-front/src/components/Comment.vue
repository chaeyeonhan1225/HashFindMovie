<!-- eslint-disable -->
<template>
  <v-card outlined style="margin-top: 6px">
    <v-container class="pa-2">
      <v-icon style="position: absolute; right: 5px" @click="removeComment()">mdi-close</v-icon>
      <div style="display:flex;">
        <span>
          <v-avatar :color="me.color">{{me.nick}}</v-avatar>
        </span>
        <span style="margin-left: 10px">
          <div style="font-weight:bold">
            <span>{{me.nick}}</span>
            <v-chip style="margin-left: 10px" small label>{{comment.movie.title}}</v-chip>
          </div>
          <div style="font-size: 14px;">
            {{comment.content}}
          </div>
        </span>
      </div>
      
    </v-container>
  </v-card>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    comment: {
      type: Object,
      allowNull: true,
    }
  },
  methods: {
    removeComment() {
      if(confirm("댓글을 삭제하시겠습니까?")){

      } 
    }
  },
  computed: {
    me() {
      return this.$store.state.userStore.me;
    }
  }
}
</script>