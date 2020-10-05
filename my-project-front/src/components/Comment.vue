<!-- eslint-disable -->
<template>
  <v-card outlined style="margin-top: 6px">
    <v-container style="padding: 5px">
      <div style="display:flex;">
        <span>
          <v-avatar color="blue">{{me.nick}}</v-avatar>
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
      required: true,
    }
  },
  computed: {
    me() {
      return this.$store.state.userStore.me;
    }
  }
}
</script>