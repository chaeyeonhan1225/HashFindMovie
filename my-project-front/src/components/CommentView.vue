<!-- eslint-disable -->
<template>
    <div>
        <v-card-text>
      <v-container>
        <span v-if="!me">
          <v-icon color="red">mdi-alert-circle</v-icon>
          로그인한 사용자만 댓글 작성 가능합니다.
        </span>
        <span v-else>
          <v-icon color="orange">mdi-star</v-icon>
          해시태그를 남겨보세요!
        </span>  
        <v-form>
          <v-textarea :disabled="!me" :success="this.success" :success-messages="this.successMessage" v-model="content" filled label="한줄 평을 남겨주세요!"></v-textarea>
          <v-btn color="blue darken-1" text @click="addComment()" absolute right>댓글 등록</v-btn>
        </v-form>
      </v-container>
    </v-card-text>
        <v-card-title>
            <h3>인기 한줄평</h3>
            <span style="font-size: 14px;margin-left: 5px;">{{this.movie[this.movieId-1].comments.length}}</span>
        </v-card-title>
        <template v-for="(comment,index) in this.movie[this.movieId-1].comments">
            <v-container :key="index" style="padding: 5px 30px">
                <div style="display:flex;margin-bottom: 8px">
                    <span>
                        <v-avatar :color="comment.user.color">{{comment.user.nick}}</v-avatar>
                    </span>
                    <span style="margin-left: 10px">
                        <div style="font-weight:bold">
                            {{comment.user.nick}}
                        </div>
                        <div style="font-size: 14px;">
                            {{comment.content}}
                        </div>
                    </span>
                </div>
            </v-container>
        </template>
    </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue';
export default {
    props: {
        movieId: {
            type: Number,
            required: true,
        }
    },
    created() {
        console.log(this.movieId);
        // console.log(movie[movieId]);
        // this.loadComments();
    },
    data() {
        return {
            content: "",
            successMessage: "",
            success: false,
        }
    },
    methods: {
        addComment() {
            if (this.content !== "") {
            this.$store.dispatch('movieStore/addComment',{
                movieId: this.movieId,
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
            return this.$store.state.movieStore.Movies;
        }
    }
}
</script>