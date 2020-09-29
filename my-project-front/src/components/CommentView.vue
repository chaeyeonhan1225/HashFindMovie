<!-- eslint-disable -->
<template>
    <div>
        <v-card-text>
      <v-container>
        <v-form>
          <v-textarea v-model="content" filled label="한줄 평을 남겨주세요!"></v-textarea>
          <v-btn color="blue darken-1" text @click="addComment()" absolute right>제출</v-btn>
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
                        <v-avatar color="blue">{{comment.user.nick}}</v-avatar>
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
                // console.log(this.movie[this.movieId].comments);
                // this.loadComments();
            }).catch((error)=>{
                console.error(error);
            })
            }
      }
    },
    computed: {
        movie() {
            return this.$store.state.movieStore.Movies;
        }
    }
}
</script>