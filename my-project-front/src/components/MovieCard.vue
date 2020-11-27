<!-- eslint-disable -->
<template>
  <div style="margin-bottom: 20px" v-if="this.movie">
    <v-card class="pt-10 mt-8" flat outlined>
      <div class="img-card">
        <v-img
          v-if="movie.image"
          :src="movie.image"
          class="img-content"
          max-height="80px"
          aspect-ratio
        ></v-img>
        <div v-else class="noimage">no image</div>
      </div>
      <div class="ma-5">
        <h2 style="font-size:1.3rem;display:inline">
          {{ this.movie.title }}({{ this.movie.pubDate }})
        </h2>
      </div>
      <v-divider></v-divider>
      <v-row align="center" justify="end">
        <router-link :to="{ name: 'Movie', params: { id: this.movie.id } }"
          >자세히 보기</router-link
        >
        <v-card-actions class="mr-2">
          <v-btn icon color="pink" @click="likeMovie()">
            <v-icon>{{ heartIcon }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-row>
    </v-card>
  </div>
</template>

<style>
  .img-card {
    position: absolute;
    top: -30px;
    left: 20px;
  }

  .img-content {
    border-radius: 10px;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
  }

  .noimage {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 120px;
    height: 80px;
    background-color: white;
    color: #c9c9c9;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
  }
</style>
<script>
  /* eslint-disable */
  import CommentView from "./CommentView";
  export default {
    name: "MovieCard",
    components: {
      CommentView,
    },
    props: {
      movie: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        like: "mdi-heart-outline",
        dialog: false,
        hashtag: "",
        focusTag: "blue",
      };
    },
    methods: {
      likeMovie() {
        if (!this.me) {
          // 로그인 안되있으면 못함 !
          if (!this.alert) this.alert = true;
          return;
        }
        if (!this.liked) {
          this.$store
            .dispatch("movieStore/likeMovie", {
              movieId: this.movie.id,
            })
            .then((result) => {
              this.like = "mdi-heart";
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          if (confirm("좋아요 취소하시겠습니까?")) {
            this.$store
              .dispatch("movieStore/removeLike", {
                movieId: this.movie.id,
              })
              .then((result) => {
                console.log("좋아요 취소");
              })
              .catch((err) => {
                console.error(err);
              });
          }
        }
      },
    },
    created() {
      this.dialog = false;
    },
    computed: {
      me() {
        return this.$store.state.userStore.me;
      },
      liked() {
        return this.me &&
          this.movie &&
          this.movie.Likers.find((x) => x.id === this.me.id)
          ? true
          : false;
      },
      heartIcon() {
        return this.liked ? "mdi-heart" : "mdi-heart-outline";
      },
      mcontent() {
        if (this.movie.content.length > 160) {
          return this.movie.content.slice(0, 160) + "...";
        } else {
          return this.movie.content;
        }
      },
    },
  };
</script>

<style scoped>
  .movie-tag:hover {
    background-color: blue;
  }
</style>
