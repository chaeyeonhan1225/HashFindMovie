<!-- eslint-disable -->
<template>
  <div style="margin-bottom: 20px">
  <v-card flat outlined>
    <!-- <v-img 
    class="white--text align-end" 
    height="200px" 
    :src="movie.img_url"
    > -->
      <div style="margin-left:5px">
        <h2 style="font-size:2.5rem;display:inline">{{movie.id}} </h2>
        <h2 style="font-size:1.5rem;display:inline">{{movie.title}}</h2>
      </div>
    <!-- </v-img> -->
    <v-container>
    <!-- <h3>{{movie.subtitle}}</h3> -->
    <!-- <p style="font-size:0.8rem">{{mcontent}}</p> -->
    <!-- <template v-for="(tag) in movie.tags">
      <v-chip :key="tag" style="margin-left:5px" color=indigo text-color="white">{{tag}}</v-chip>
    </template> -->
    </v-container>
    <v-divider></v-divider>
    <v-row
      align="center"
      justify="end"
    >
      <v-card-actions
        style="margin-right: 12px"
       >
        좋아요 누른 횟수
        <v-btn icon color="pink" @click="likeMovie()">
          <v-icon>{{like}}</v-icon>
        </v-btn> 
      <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon 
          color="gray"
          v-bind="attrs"
          v-on="on"  
        >
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>
      </template>
      <v-card>
    <v-card-title>
      <h3><span class="mark_pen-yellow">한줄 평</span>을 남겨주세요!</h3>
      <v-spacer></v-spacer>
      <v-icon @click="dialog = false">mdi-close</v-icon>
    </v-card-title>
    
    <CommentView :movieId="movie.id"></CommentView>
  </v-card>
    </v-dialog>
      </v-card-actions>
    </v-row>
    
  </v-card>
  </div>
</template>

<script>
/* eslint-disable */
import CommentView from "./CommentView";
export default{
    name: "MovieCard",
    components: {
      CommentView,
    },
    props: {
      movie: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        like: 'mdi-heart-outline',
        dialog: false,
        content: this.movie.content,
        hashtag : "",
        focusTag: "blue",
      }
    },
    methods: {
      likeMovie() {
        if(this.like === "mdi-heart-outline"){
          this.$store.dispatch('movieStore/likeMovie',{
            no: this.movie.id
          }).then((result)=>{
             this.like = "mdi-heart";
          }).catch((err)=>{
            console.error(err);
          });
        } else {
          if(confirm('좋아요 취소하시겠습니까?')) {
            this.$store.dispatch('movieStore/removeLike',{
              no: this.movie.id
            }).then((result) => {
              this.like = "mdi-heart-outline";
            }).catch((err)=>{
              console.error(err);
            });
          }
        }
      },
    },
    computed: {
      mcontent() {
        if(this.movie.content.length > 160){
          return this.movie.content.slice(0,160)+"...";
        } else {
          return this.movie.content;
        }
      },
    }
}
</script>

<style scoped>
.movie-tag:hover {
  background-color: blue;
}
</style>