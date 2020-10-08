<!-- eslint-disable -->
<template>
  <div style="margin-bottom: 20px" v-if="this.movie">
  <v-card flat outlined>
    <!-- <v-img 
    class="white--text align-end" 
    height="200px" 
    :src="movie.img_url"
    > -->
      <div style="margin-left:5px">
        <h2 style="font-size:2.5rem;display:inline">{{this.movie.id}} </h2>
        <h2 style="font-size:1.5rem;display:inline">{{this.movie.title}}</h2>
      </div>
    <!-- </v-img> -->
    <v-container>
      <router-link :to="{ name: 'Movie', params: { id: this.movie.id }}">자세히 보기</router-link>
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
        class="mr-2"
       >
        <v-btn icon color="pink" @click="likeMovie()">
          <v-icon>{{heartIcon}}</v-icon>
        </v-btn> 
        <v-btn icon>
          <v-icon>mdi-message-outline</v-icon>
        </v-btn>
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
        hashtag : "",
        focusTag: "blue",
      }
    },
    methods: {
      likeMovie() {
        if(!this.me) {  // 로그인 안되있으면 못함 !
          if(!this.alert) this.alert = true;
          return;
        }
        if(!this.liked){
          this.$store.dispatch('movieStore/likeMovie',{
            movieId: this.movie.id
          }).then((result)=>{
             this.like = "mdi-heart";
          }).catch((err)=>{
            console.error(err);
          });
        } else {
          if(confirm('좋아요 취소하시겠습니까?')) {
            this.$store.dispatch('movieStore/removeLike',{
              movieId : this.movie.id
            }).then((result) => {
              console.log("좋아요 취소");
            }).catch((err)=>{
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
        return this.me && this.movie && this.movie.Likers.find(x => x.id === this.me.id) ? true : false;
      },
      heartIcon() {
        return this.liked ? 'mdi-heart' : 'mdi-heart-outline';
      },
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