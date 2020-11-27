<!-- eslint-disable -->
<template>
  <v-container class="pa-3" v-if="movie">
    <v-row>
      <v-col cols="12" md="4">
        <h1>{{ movie.title }} ({{ movie.pubDate }})</h1>
        <div>
          <v-img
            :src="movie.image"
            max-width="250"
            class="mt-2"
            style="border-radius:15px"
            contain
          ></v-img>
        </div>
      </v-col>
      <v-col cols="12" md="8">
        <span>
          <h2 v-if="movie.subtitle" style="display:inline">
            {{ movie.subtitle }}
          </h2>
          <v-icon class="ml-1" style="bottom: 5px" color="pink">{{
            heartIcon
          }}</v-icon>
        </span>
        <div>
          감독
          <template v-for="d in movie.director.split('|')">
            <v-chip
              small
              :key="d"
              class="ml-1 mt-1"
              label
              color="#edebeb"
              text-color="blue"
              >{{ d }}</v-chip
            >
          </template>
        </div>
        <div class="mt-1">
          출연진
          <template v-for="a in movie.actor.split('|')">
            <v-chip
              small
              :key="a"
              class="ml-1 mt-1"
              label
              color="#edebeb"
              text-color="blue"
              >{{ a }}</v-chip
            >
          </template>
        </div>
        <div class="mt-2">
          인기 한줄평
          <template v-for="(c, index) in movieComments">
            <Comment :comment="c" :key="index" />
          </template>
        </div>
      </v-col>
    </v-row>
    <div>
      <h1>한줄평</h1>
      <v-card flat outline>
        <div>
          <v-container>
            <span v-if="!me">
              <v-icon color="red">mdi-alert-circle</v-icon>
              로그인한 사용자만 댓글 작성 가능합니다.
            </span>
            <span v-else>
              #해시태그를 남겨보세요!
            </span>
            <v-form>
              <v-textarea
                :disabled="!me"
                :success="this.success"
                :success-messages="this.successMessage"
                v-model="content"
                filled
                label="한줄 평을 남겨주세요!"
              ></v-textarea>
              <v-btn
                color="blue darken-1"
                text
                @click="addComment()"
                absolute
                right
                >댓글 등록</v-btn
              >
            </v-form>
          </v-container>
        </div>
        <div>
          <h3 style="display:inline">한줄평 전체보기</h3>
          <span style="font-size: 14px;margin-left: 5px;">{{
            movie.comments.length
          }}</span>
        </div>
        <div v-if="movie.comments.length > 0">
          <template v-for="(c, index) in movie.comments">
            <Comment :comment="c" :key="index" />
          </template>
        </div>
        <div v-else>
          등록된 한줄평이 없습니다! 한줄평을 남겨보세요!
        </div>
      </v-card>
    </div>
  </v-container>
</template>
<script>
/* eslint-disable */
import Comment from "../components/Comment";
export default {
  components: {
    Comment,
  },
  created() {
    console.log(this.$route.params.id);
    this.loadMovie();
  },
  data() {
    return {
      content: "",
      successMessage: "",
      success: false,
    };
  },
  methods: {
    loadMovie() {
      this.$store.dispatch("movieStore/loadMovie", {
        movieId: this.$route.params.id,
      });
    },
    addComment() {
      if (this.content !== "") {
        this.$store
          .dispatch("movieStore/addComment", {
            movieId: this.$route.params.id,
            content: this.content,
          })
          .then((result) => {
            this.content = "";
            console.log("댓글 등록 !!");
            this.success = true;
            this.successMessage = "댓글이 정상적으로 등록되었습니다!";
            // console.log(this.movie[this.movieId].comments);
            // this.loadComments();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
  computed: {
    me() {
      return this.$store.state.userStore.me;
    },
    movie() {
      return this.$store.state.movieStore.movie;
    },
    movieComments() {
      return this.$store.state.movieStore.movieComments;
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
  },
};
</script>
