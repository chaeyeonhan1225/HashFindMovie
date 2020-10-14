<!-- eslint-disable -->
<template>
  <v-container class="pa-3" v-if="movie">
        <v-row>
            <v-col cols="12" md="5">
                <h1>{{movie.title}}</h1>
            <v-img :src="this.img_url" max-width="250" contain></v-img>
            </v-col>
            <v-col cols="12" md="7">
                <h2>Subtitle</h2>
                <div>영화 요약</div>
                <div>출연진</div>
                <div>인기 한줄평</div>
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
              <v-textarea :disabled="!me" :success="this.success" :success-messages="this.successMessage" v-model="content" filled label="한줄 평을 남겨주세요!"></v-textarea>
              <v-btn color="blue darken-1" text @click="addComment()" absolute right>댓글 등록</v-btn>
            </v-form>
          </v-container>
        </div>
        <div>
            <h3 style="display:inline">한줄평 전체보기</h3>
            <span style="font-size: 14px;margin-left: 5px;">{{movie.comments.length}}</span>
        </div>
        <template v-for="(c,index) in movie.comments">
          <Comment :comment="c" :key="index"/>
        </template>
    </v-card>
    </div>
  </v-container>
</template>
<script>
/* eslint-disable */
import Comment from '../components/Comment';
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
            img_url: ""    
        }
    },
    methods: {
        loadMovie() {
            this.$store.dispatch('movieStore/loadMovie',{
                movieId: this.$route.params.id,
            });
        },
        addComment() {
            if (this.content !== "") {
            this.$store.dispatch('movieStore/addComment',{
                movieId: this.$route.params.id,
                content: this.content,
            }).then((result)=>{
                this.content = "";
                console.log("댓글 등록 !!");
                this.success = true;
                this.successMessage = "댓글이 정상적으로 등록되었습니다!";
                // console.log(this.movie[this.movieId].comments);
                // this.loadComments();
            }).catch((error)=>{
                console.error(error);
            })
            }
      }
    },
    computed: {
        me() {
            return this.$store.state.userStore.me;
        },
        movie() {
            return this.$store.state.movieStore.movie;
        }
    }
}
</script>